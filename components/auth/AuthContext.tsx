import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "expo-router";
import { supabase } from "@/libs/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

// -----------------------------
// Tipos
// -----------------------------
export interface UserProfile {
  id: string;
  nickname: string;
  full_name: string;
  puntuation: number;
  image: string;
  email: string;
  gemas: number;
  vidas: number;
  racha: number;
  user_position: number;
  last_lesson: string;
  last_vida: string;
  proteccion: number;
  position: number;
  friendRank?: number | null;
  amistades: number;
  victorias: number;
  partidas: number;
  creado: string;
  progress: number;
}

export interface Amistad {
  id_usuario_solicitante: string;
  id_usuario_receptor: string;
  estado: string;
  fecha_solicitud?: string;
  id_amistad?: string;
}
export interface SolicitudAmistad {
  id_amistad: string; // UUID
  id_usuario_solicitante: string; // UUID
  id_usuario_receptor: string; // UUID
  estado: "pendiente" | "aceptada" | "rechazada";
  fecha_solicitud: string;
  solicitante: {
    id: string; // UUID
    nickname: string;
    full_name: string;
    image: string;
    puntuation: number;
  };
}

interface AuthContextType {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  users: UserProfile[];
  pendingFriends: SolicitudAmistad[];
  friendUsers: UserProfile[];
  isAuthReady: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  NewSolicitud: (
    UUID_Enviado: string,
    UUID_Receptor: string,
    estado?: string
  ) => Promise<Amistad | null>;
  SolicitudChange: (
    UIDsolicitud: string,
    estado: string
  ) => Promise<Amistad | null>;
  DeleteSolicitud: (UUID_Solicitud: string) => Promise<void>;
  Compra: (
    UUID_Solicitud: string,
    gemas: number,
    proteccion: number,
    vidas: number
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  users: [],
  friendUsers: [],
  pendingFriends: [],
  isAuthReady: false,
  signIn: async () => {},
  signOut: async () => {},
  NewSolicitud: async () => null,
  SolicitudChange: async () => null,
  DeleteSolicitud: async () => {},
  Compra: async () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [friendUsers, setFriendUsers] = useState<UserProfile[]>([]);
  const [pendingFriends, setPendingFriends] = useState<SolicitudAmistad[]>([]);
  const [isAuthReady, setAuthReady] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Fetch profile via RPC
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .rpc("get_user_stats", { in_uid: userId })
        .single();
      if (error || !profile) throw error;
      return {
        ...(profile as UserProfile),
        position: (profile as UserProfile).user_position,
        friendRank: null,
        progress: 0,
      } as UserProfile;
    } catch (err) {
      console.error("Error fetching profile:", err);
      return null;
    }
  }, []);

  useEffect(() => {
    setUser((prev) =>
      prev ? { ...(prev as UserProfile), progress: 0 } : prev
    );
  }, [pathname, user?.id]);

  // Fetch rankings via RPC
  const fetchRankings = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc(
        "get_dashboard_with_requests",
        {
          p_user_id: userId,
        }
      );
      if (error) throw error;
      console.log("data:", data);
      setUsers(data.top_global);
      setFriendUsers(data.top_friends);
      setPendingFriends(data.pending_requests || []);
      setUser((prev) =>
        prev ? { ...prev, friendRank: data.friend_rank } : prev
      );
    } catch (err) {
      console.error("Error fetching rankings:", err);
    }
  }, []);

  // Initialize auth
  const initAuth = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user.id) {
      const profile = await fetchUserProfile(session.user.id);
      if (profile) {
        setUser(profile);
        fetchRankings(session.user.id);
      }
    }
    setAuthReady(true);
  }, [fetchUserProfile, fetchRankings]);

  // Listen auth changes
  useEffect(() => {
    initAuth();
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        if (session?.user.id) {
          const profile = await fetchUserProfile(session.user.id);
          if (profile) {
            setUser(profile);
            fetchRankings(session.user.id);
          }
        } else {
          setUser(null);
        }
      }
    );
    return () => listener.subscription.unsubscribe();
  }, [initAuth, fetchUserProfile, fetchRankings]);

  // Redirect when ready and not signed in
  useEffect(() => {
    if (isAuthReady && !user && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isAuthReady, user, pathname, router]);

  // Cuando tenemos usuario, iniciamos suscripciones y rankings
  useEffect(() => {
    if (!user) return;
    (async () => {
      // Cargamos rankings iniciales
      fetchRankings(user?.id);

      // Suscripción a cambios en amistades para refrescar rankings
      const amistadChannel = supabase
        .channel(`amistades_user_${user.id}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "amistades" },
          async (payload: RealtimePostgresChangesPayload<Amistad>) => {
            console.log("Amistad change:", payload);
            await fetchRankings(user.id);
          }
        )
        .subscribe();

      // Suscripción a cambios en el perfil propio
      const profileChannel = supabase
        .channel(`profiles_user_${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "profiles",
            filter: `id=eq.${user.id}`,
          },
          (payload: RealtimePostgresChangesPayload<UserProfile>) => {
            // Actualizamos state y caché con campos modificados
            setUser((prev) => {
              if (!prev) return prev;
              const updated = { ...prev, ...payload.new } as UserProfile;
              fetchUserProfile(user.id);
              return updated;
            });
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(amistadChannel);
        supabase.removeChannel(profileChannel);
      };
    })();
  }, [user?.id, fetchRankings, fetchUserProfile]);

  // Auth actions (hooks always executed)
  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  }, []);

  const NewSolicitud = useCallback(
    async (
      UUID_Enviado: string,
      UUID_Receptor: string,
      estado = "pendiente"
    ) => {
      try {
        const { data, error } = await supabase
          .from("amistades")
          .insert({
            id_usuario_solicitante: UUID_Enviado,
            id_usuario_receptor: UUID_Receptor,
            estado,
            fecha_solicitud: new Date().toISOString(),
          })
          .select();
        if (error) throw error;
        return data?.[0] ?? null;
      } catch (err) {
        console.error("Error creating solicitud:", err);
        return null;
      }
    },
    []
  );

  const SolicitudChange = useCallback(
    async (UIDsolicitud: string, estado: string) => {
      try {
        const { data, error } = await supabase
          .from("amistades")
          .update({ estado })
          .eq("id_amistad", UIDsolicitud)
          .select();
        if (error) throw error;
        console.log("Solicitud updated:", data);
        return data?.[0] ?? null;
      } catch (err) {
        console.error("Error updating solicitud:", err);
        return null;
      }
    },
    []
  );

  const Compra = useCallback(
    async (
      UIDsolicitud: string,
      gemas: number,
      proteccion: number,
      vidas: number
    ) => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .update({
            gemas,
            vidas,
            proteccion,
            last_vida:
              vidas !== (user?.vidas || 0)
                ? new Date().toISOString()
                : user?.last_vida,
          })
          .eq("id", UIDsolicitud)
          .select();
        if (error) throw error;
        console.log("Solicitud updated:", data);
        return data?.[0] ?? null;
      } catch (err) {
        console.error("Error updating solicitud:", err);
        return null;
      }
    },
    [user?.last_vida, user?.vidas]
  );

  const DeleteSolicitud = useCallback(async (UUID_Solicitud: string) => {
    try {
      const { error } = await supabase
        .from("amistades")
        .delete()
        .eq("id_amistad", UUID_Solicitud);
      if (error) throw error;
    } catch (err) {
      console.error("Error deleting solicitud:", err);
    }
  }, []);

  // Prepare context value
  const contextValue = useMemo(
    () => ({
      user,
      users,
      setUser,
      pendingFriends,
      friendUsers,
      isAuthReady,
      signIn,
      signOut,
      NewSolicitud,
      SolicitudChange,
      DeleteSolicitud,
      Compra,
    }),
    [
      user,
      users,
      setUser,
      pendingFriends,
      friendUsers,
      isAuthReady,
      signIn,
      signOut,
      NewSolicitud,
      SolicitudChange,
      DeleteSolicitud,
      Compra,
    ]
  );

  if (!isAuthReady) {
    return null; // or a loading spinner
  }
  console.log("AuthContext", user);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
