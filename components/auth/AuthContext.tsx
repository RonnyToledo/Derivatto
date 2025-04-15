import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/lib/supbase";
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
  last_lesson: string;
  proteccion: number;
  position: number; // Ranking global
  friendRank?: number | null; // Ranking entre amigos
  amistades: number; // Nº de amistades
  victorias: number;
  partidas: number;
  creado: string; // Fecha de creación
}

interface AuthContextType {
  user: UserProfile | null;
  users: UserProfile[]; // Top 10 global
  friendUsers: UserProfile[]; // Top 10 entre amigos
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  NewSolicitud: (
    UUID_Enviado: string,
    UUID_Receptor: string,
    estado: string
  ) => Promise<Amistad | null>;
  SolicitudChange: (
    UIDsolicitud: string,
    estado: string
  ) => Promise<Amistad | null>;
  DeleteSolicitud: (UUID_Solicitud: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Interfaz para la tabla "amistades"
export interface Amistad {
  id_usuario_solicitante: string;
  id_usuario_receptor: string;
  estado: string;
  fecha_solicitud?: string;
  id_amistad?: string;
}

// -----------------------------
// Constantes de caché
// -----------------------------

const USER_CACHE_KEY = "user_profile_cache";
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// -----------------------------
// Utilidades de caché (AsyncStorage)
// -----------------------------

const storeUserInCache = async (user: UserProfile) => {
  try {
    const payload = { user, expiry: Date.now() + ONE_WEEK_MS };
    await AsyncStorage.setItem(USER_CACHE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.error("Error al guardar en caché:", error);
  }
};

const getCachedUser = async (): Promise<UserProfile | null> => {
  try {
    const raw = await AsyncStorage.getItem(USER_CACHE_KEY);
    if (!raw) return null;

    const { user, expiry } = JSON.parse(raw);
    if (Date.now() > expiry) {
      await AsyncStorage.removeItem(USER_CACHE_KEY);
      return null;
    }
    return user as UserProfile;
  } catch (error) {
    console.error("Error al leer de la caché:", error);
    return null;
  }
};

const clearCachedUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_CACHE_KEY);
  } catch (error) {
    console.error("Error al limpiar la caché:", error);
  }
};

// -----------------------------
// Funciones de obtención de datos desde Supabase
// -----------------------------

/**
 * Obtiene el perfil de usuario, número de amistades y ranking global.
 */
const fetchUserProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  try {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (profileError || !profile) throw profileError;

    const { count: amistadCount, error: friendshipsError } = await supabase
      .from("amistades")
      .select("*", { count: "exact", head: true })
      .or(
        `id_usuario_solicitante.eq.${userId},id_usuario_receptor.eq.${userId}`
      )
      .eq("estado", "aceptada");
    if (friendshipsError) throw friendshipsError;

    const { count: higherCount, error: rankError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gt("puntuation", profile.puntuation);
    if (rankError) throw rankError;

    return {
      ...profile,
      amistades: amistadCount || 0,
      position: (higherCount || 0) + 1,
      friendRank: null, // Se actualizará más adelante
    };
  } catch (error) {
    console.error("Error en fetchUserProfile:", error);
    return null;
  }
};

/**
 * Recupera los IDs de amigos aceptados del usuario.
 */
const fetchFriendIds = async (userId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from("amistades")
      .select("id_usuario_solicitante, id_usuario_receptor")
      .or(
        `id_usuario_solicitante.eq.${userId},id_usuario_receptor.eq.${userId}`
      )
      .eq("estado", "aceptada");
    if (error || !data) throw error;
    console.log(
      "fetchFriendIds",
      data.map((a: any) =>
        a.id_usuario_solicitante === userId
          ? a.id_usuario_receptor
          : a.id_usuario_solicitante
      )
    );

    return data.map((a: any) =>
      a.id_usuario_solicitante === userId
        ? a.id_usuario_receptor
        : a.id_usuario_solicitante
    );
  } catch (error) {
    console.error("Error en fetchFriendIds:", error);
    return [];
  }
};

/**
 * Obtiene los top 10 amigos por puntuación.
 */
const fetchTopFriendUsers = async (
  friendIds: string[]
): Promise<UserProfile[] | null> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .in("id", friendIds)
      .order("puntuation", { ascending: false })
      .limit(10);
    if (error) throw error;
    return data as UserProfile[];
  } catch (error) {
    console.error("Error en fetchTopFriendUsers:", error);
    return null;
  }
};

/**
 * Calcula el ranking del usuario entre sus amigos.
 */
const fetchFriendRank = async (
  user: UserProfile,
  friendIds: string[]
): Promise<number | null> => {
  try {
    const { count, error } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .in("id", friendIds)
      .gt("puntuation", user.puntuation);
    if (error) throw error;
    return (count || 0) + 1;
  } catch (error) {
    console.error("Error en fetchFriendRank:", error);
    return null;
  }
};

// -----------------------------
// Contexto de Autenticación
// -----------------------------

export const AuthContext = createContext<AuthContextType>({
  user: null,
  users: [],
  friendUsers: [],
  signIn: async () => {},
  signOut: async () => {},
  NewSolicitud: async () => {
    return null;
  },
  SolicitudChange: async () => {
    return null;
  },
  DeleteSolicitud: async () => {},
});

// -----------------------------
// Componente AuthProvider
// -----------------------------

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [friendUsers, setFriendUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  // Función para cargar los rankings global y entre amigos
  const loadRankings = useCallback(async () => {
    if (!user) return;

    // 1) Top 10 global
    const { data: globalData, error: globalError } = await supabase
      .from("profiles")
      .select("*")
      .order("puntuation", { ascending: false })
      .limit(10)
      .neq("id", user.id);

    if (!globalError && globalData) {
      const topGlobal = [...globalData, user]
        .sort((a, b) => b.puntuation - a.puntuation)
        .slice(0, 10);
      setUsers(topGlobal);
    }

    // 2) Top amigos y rank entre amigos
    const friendIds = await fetchFriendIds(user.id);

    const topFriends = (await fetchTopFriendUsers(friendIds)) || [];
    setFriendUsers(
      [...topFriends, user]
        .sort((a, b) => b.puntuation - a.puntuation)
        .slice(0, 10)
    );
    const newRank = await fetchFriendRank(user, friendIds);
    setUser((u) =>
      u && u.friendRank !== newRank ? { ...u, friendRank: newRank } : u
    );
  }, [user, fetchFriendIds, fetchTopFriendUsers, fetchFriendRank]);

  // Carga inicial y escucha de cambios en la sesión
  useEffect(() => {
    (async () => {
      let current = await getCachedUser();
      if (!current) {
        const { data } = await supabase.auth.getSession();
        const id = data.session?.user.id;
        if (id) {
          current = await fetchUserProfile(id);
          if (current) {
            setUser(current);
            await storeUserInCache(current);
          }
        }
      } else {
        setUser(current);
      }
      setLoading(false);
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, session: Session | null) => {
        if (session?.user.id) {
          const updated = await fetchUserProfile(session.user.id);
          if (updated) {
            setUser((prev) =>
              prev?.id === updated.id && prev.friendRank === updated.friendRank
                ? prev
                : updated
            );
            await storeUserInCache(updated);
          }
        } else {
          setUser(null);
          await clearCachedUser();
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

  // Redirige a "/login" si el usuario no está autenticado
  useEffect(() => {
    if (!user && !loading && pathname !== "/login") {
      router.push("/login");
    }
  }, [user, loading, pathname, router]);

  // Suscripción a cambios en las tablas "amistades" y "profiles"
  useEffect(() => {
    if (!user) return;
    loadRankings();

    const amistadChannel = supabase
      .channel("amistades-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "amistades" },
        (payload) => {
          console.log("Cambio en amistades:", payload);
          loadRankings();
        }
      )
      .subscribe();

    const profilesChannel = supabase
      .channel("profiles-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        (payload) => {
          console.log("Cambio en profiles:", payload);
          loadRankings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(amistadChannel);
      supabase.removeChannel(profilesChannel);
    };
  }, [user]);

  // Métodos de autenticación
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
    await clearCachedUser();
  }, []);

  async function NewSolicitud(
    UUID_Enviado: string,
    UUID_Receptor: string,
    estado: string = "pendiente"
  ): Promise<Amistad | null> {
    const solicitud: Amistad = {
      id_usuario_solicitante: UUID_Enviado,
      id_usuario_receptor: UUID_Receptor,
      estado,
      fecha_solicitud: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("amistades")
      .insert(solicitud)
      .select();

    if (error) {
      console.error("Error al realizar el upsert de la solicitud:", error);
      return null;
    }

    // Se devuelve el primer elemento del arreglo resultante
    return data && data.length > 0 ? data[0] : null;
  }

  async function SolicitudChange(
    UIDsolicitud: string,
    estado: string
  ): Promise<Amistad | null> {
    const { data, error } = await supabase
      .from("amistades")
      .update({ estado })
      .eq("id_amistad", UIDsolicitud)
      .select();

    if (error) {
      console.error("Error al realizar el upsert de la solicitud:", error);
      return null;
    }

    // Se devuelve el primer elemento del arreglo resultante
    return data && data.length > 0 ? data[0] : null;
  }

  async function DeleteSolicitud(UUID_Solicitud: string) {
    const { data, error } = await supabase
      .from("amistades")
      .delete()
      .eq("id_amistad", UUID_Solicitud);

    if (error) {
      console.error("Error al eliminar la solicitud:", error);
    }
  }

  // Memoriza el valor del contexto
  const contextValue = useMemo(
    () => ({
      user,
      users,
      friendUsers,
      signIn,
      signOut,
      NewSolicitud,
      SolicitudChange,
      DeleteSolicitud,
    }),
    [
      user,
      users,
      friendUsers,
      signIn,
      signOut,
      NewSolicitud,
      SolicitudChange,
      DeleteSolicitud,
    ]
  );
  console.log(users, friendUsers);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
