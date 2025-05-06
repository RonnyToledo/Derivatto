import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  UserPlus,
  UserCheck,
  Trophy,
  User,
  ArrowLeft,
  UserPlus2,
  Star,
  Gift,
  Flashlight,
} from "lucide-react-native";
import AchievementCard from "@/components/AchievementCard";
import * as Progress from "react-native-progress";
import { supabase } from "@/libs/supabase";
import { AuthContext } from "@/components/auth/AuthContext";
import { getLevelInfo } from "@/functions/getLevelInfo";
import ScrollViewReload from "@/components/ScrollViewReload";

// Definición del tipo de usuario
export interface UserProfile1 {
  id?: string;
  nickname?: string;
  full_name?: string;
  puntuation?: number;
  image?: string;
  email?: string;
  gemas?: number;
  vidas?: number;
  racha?: number;
  last_lesson?: string;
  proteccion?: number;
  position?: number; // Ranking global
  friendRank?: number | null; // Ranking entre amigos
  amistades?: number; // Nº de amistades
  victorias?: number;
  partidas?: number;
  creado?: string; // Fecha de creación
  status?: "nada" | "pendiente_env" | "pendiente_rec" | "aceptada";
  idAmistad?: string;
}

// Función para obtener el perfil del usuario desde Supabase
const fetchUserProfile = async (
  nickname: string,
  UserId: string
): Promise<UserProfile1 | null> => {
  try {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("nickname", nickname);

    if (profileError || !profile || profile.length === 0) throw profileError;

    // Usamos el primer registro obtenido
    const value = profile[0];

    // Contamos las amistades (aceptadas)
    const { count: amistadCount, error: friendshipsError } = await supabase
      .from("amistades")
      .select("*", { count: "exact", head: true })
      .or(
        `id_usuario_solicitante.eq.${value.id},id_usuario_receptor.eq.${value.id}`
      );
    if (friendshipsError) throw friendshipsError;

    const { data: requests, error: reqErr } = await supabase
      .from("amistades")
      .select("id_usuario_solicitante, id_usuario_receptor, estado, id_amistad")
      .or(
        `and(id_usuario_solicitante.eq.${value.id},id_usuario_receptor.eq.${UserId}),` +
          `and(id_usuario_receptor.eq.${value.id},id_usuario_solicitante.eq.${UserId})`
      );
    if (reqErr) throw reqErr;
    const request = requests[0];
    let friendStatus: UserProfile1["status"] = "nada";
    if (request) {
      if (request.estado === "pendiente") {
        friendStatus =
          request.id_usuario_solicitante === UserId
            ? "pendiente_env"
            : "pendiente_rec";
      } else if (request.estado === "aceptada") {
        friendStatus = "aceptada";
      }
    }

    return {
      ...value,
      amistades: amistadCount || 0,
      status: friendStatus,
    };
  } catch (error) {
    console.error("Error en fetchUserProfile:", error);
    return null;
  }
};

const UserProfilePage = () => {
  const { user, SolicitudChange, DeleteSolicitud, NewSolicitud } =
    useContext(AuthContext);
  const router = useRouter();
  const { userProfile } = useLocalSearchParams<{ userProfile: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserProfile1 | null>(null);
  const [activeTab, setActiveTab] = useState<"achievements" | "inventory">(
    "achievements"
  );

  const handleGoBack = () => {
    router.push("/perfil");
  };

  // Función para actualizar el estado del perfil (por ejemplo, actualizar status e idAmistad)
  const updateItemStatus = (
    userId: string,
    idAmistad: string,
    newStatus: UserProfile1["status"]
  ) => {
    if (userData && userData.id === userId) {
      setUserData({ ...userData, status: newStatus, idAmistad });
    }
  };

  // Para remover la solicitud, ponemos el estado en "nada"
  const removeItem = (userId: string) => {
    if (userData && userData.id === userId) {
      setUserData({ ...userData, status: "nada", idAmistad: undefined });
    }
  };

  // Carga asíncrona del perfil
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      const profile = await fetchUserProfile(userProfile, user?.id || "");
      setUserData(profile);
      setIsLoading(false);
    };
    if (user) {
      loadProfile();
    }
  }, [userProfile, user]);

  // Si no se recibe el parámetro, no renderiza nada
  if (!userProfile || typeof userProfile !== "string") {
    return null;
  }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ec4899" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.centered}>
        <User size={64} color="#d1d5db" />
        <Text style={styles.title}>Usuario no encontrado</Text>
        <Text style={styles.subtitle}>
          No pudimos encontrar el perfil que estás buscando.
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ec4899" }]}
          onPress={handleGoBack}
        >
          <ArrowLeft size={16} color="#fff" />
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollViewReload style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCardContainer}>
        <View style={styles.profileCardBackground} />
        <View style={styles.profileCard}>
          <View style={{ gap: 10 }}>
            <View style={styles.profileRow}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={{
                      uri:
                        userData.image ||
                        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
                    }}
                    style={styles.avatar}
                  />
                </View>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>
                    {getLevelInfo(userData?.puntuation ?? 0).currentLevel}
                  </Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.name}>{userData.full_name}</Text>
                <Text style={styles.username}>@{userData.nickname}</Text>
                <Text style={styles.joinDate}>
                  Miembro desde {formatFecha(userData?.creado || "")}
                </Text>
              </View>
            </View>

            {/* Botones de acción según el estado de amistad */}
            <View style={styles.actionButtonContainer}>
              {userData.status === "nada" && (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#ec4899" }]}
                  onPress={async () => {
                    setLoading(true);
                    const value = await NewSolicitud(
                      user?.id || "",
                      userData.id || "",
                      "pendiente"
                    );
                    updateItemStatus(
                      userData.id || "",
                      value?.id_amistad || "",
                      "pendiente_env"
                    );
                    setLoading(false);
                  }}
                  disabled={loading}
                >
                  <UserPlus size={16} color="white" />
                  <Text style={styles.addButtonText}>Agregar</Text>
                </TouchableOpacity>
              )}

              {userData.status === "pendiente_env" && (
                <TouchableOpacity
                  style={styles.outlineButton}
                  onPress={async () => {
                    setLoading(true);
                    await DeleteSolicitud(userData.idAmistad as string);
                    removeItem(userData.id || "");
                    setLoading(false);
                  }}
                  disabled={loading}
                >
                  <UserCheck size={16} color="gray" />
                  <Text style={styles.pendienteText}>Pendiente</Text>
                </TouchableOpacity>
              )}

              {userData.status === "pendiente_rec" && (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#ec4899" }]}
                  onPress={async () => {
                    setLoading(true);
                    const value = await SolicitudChange(
                      userData.idAmistad || "",
                      "aceptada"
                    );
                    updateItemStatus(
                      userData.id || "",
                      value?.id_amistad || "",
                      "aceptada"
                    );
                    setLoading(false);
                  }}
                  disabled={loading}
                >
                  <UserCheck size={16} color="gray" />
                  <Text style={styles.pendienteText}>Aceptar</Text>
                </TouchableOpacity>
              )}

              {userData.status === "aceptada" && (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#ec4899" }]}
                  onPress={async () => {
                    setLoading(true);
                    await DeleteSolicitud(userData.idAmistad as string);
                    removeItem(userData.id || "");
                    setLoading(false);
                  }}
                  disabled={loading}
                >
                  <UserCheck size={16} color="green" />
                  <Text style={styles.friendsText}>Amigos</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Progreso */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <View style={styles.progressLabel}>
                <Star size={16} color="#f59e0b" />
                <Text style={styles.progressText}>
                  Nivel {getLevelInfo(userData?.puntuation ?? 0).currentLevel}
                </Text>
              </View>
              <Text style={styles.progressXP}>
                {userData?.puntuation} /{" "}
                {getLevelInfo(userData?.puntuation ?? 0).nextLevelScore} XP
              </Text>
            </View>
            <Progress.Bar
              progress={
                (user?.puntuation ?? 0) /
                getLevelInfo(user?.puntuation ?? 0).nextLevelScore
              }
              width={null}
              color="#ec4899"
              borderWidth={0}
              height={6}
              style={styles.progressBar}
            />
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Partidas</Text>
              <Text style={styles.statValue}>{userData.partidas}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Victorias</Text>
              <Text style={styles.statValue}>{userData.victorias}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Amigos</Text>
              <Text style={styles.statValue}>{userData.amistades}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <View style={styles.tabsHeader}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "achievements" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("achievements")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "achievements" && styles.activeTabText,
              ]}
            >
              Logros
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContent}>
          {activeTab === "achievements" && (
            <View style={styles.achievementsGrid}>
              <AchievementCard
                title="Primer Victoria"
                description="Gana tu primera partida"
                icon={<Trophy size={20} color="#3b82f6" />}
                progress={100}
              />
              <AchievementCard
                title="Coleccionista"
                description="Obtén 10 objetos diferentes"
                icon={<Gift size={20} color="#3b82f6" />}
                progress={80}
              />
              <AchievementCard
                title="Imparable"
                description="Gana 5 partidas seguidas"
                icon={<Flashlight size={20} color="#3b82f6" />}
                progress={60}
              />
              <AchievementCard
                title="Social"
                description="Agrega 20 amigos"
                icon={<UserPlus2 size={20} color="#3b82f6" />}
                progress={90}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollViewReload>
  );
};
export const formatFecha = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loadingText: { marginTop: 16, color: "#6b7280" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 6,
  },
  buttonText: { color: "#fff", marginLeft: 8 },
  header: {
    backgroundColor: "#ec4899",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerButton: { padding: 8 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  profileCardContainer: {
    position: "relative",
    paddingBottom: 16,
  },
  profileCardBackground: {
    height: 80,
    backgroundColor: "#ec4899",
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginTop: -40,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  profileRow: { flexDirection: "row" },
  avatarContainer: { marginTop: -32, position: "relative" },
  avatarWrapper: {
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#fff",
    elevation: 3,
  },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  levelBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#3b82f6",
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  levelText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  infoContainer: { flex: 1, marginLeft: 12, justifyContent: "center" },
  name: { fontSize: 18, fontWeight: "bold", color: "#1f2937" },
  username: { fontSize: 14, color: "#6b7280" },
  joinDate: { fontSize: 12, color: "#6b7280" },
  actionButtonContainer: { justifyContent: "center", alignItems: "center" },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionButtonText: { color: "#fff", marginLeft: 4 },
  outlineButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ec4899",
  },
  outlineButtonText: { color: "#ec4899", marginLeft: 4 },
  progressContainer: { marginTop: 16 },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: { flexDirection: "row", alignItems: "center" },
  progressText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
  },
  progressXP: { fontSize: 12, color: "#6b7280" },
  progressBar: {
    marginTop: 4,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f3f4f6",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  statBox: { alignItems: "center" },
  statLabel: { fontSize: 12, color: "#6b7280" },
  statValue: { fontSize: 16, fontWeight: "bold", color: "#1f2937" },
  tabsContainer: { marginTop: 16 },
  tabsHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  tabButton: { flex: 1, padding: 12, alignItems: "center" },
  activeTab: { backgroundColor: "#fde7f2" },
  tabText: { fontSize: 14, color: "#1f2937" },
  activeTabText: { color: "#ec4899", fontWeight: "bold" },
  tabContent: { padding: 16 },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  inventoryContainer: {},
  inventoryItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  inventoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  inventoryInfo: { flex: 1 },
  inventoryTitle: { fontSize: 16, fontWeight: "500", color: "#1f2937" },
  inventorySubtitle: { fontSize: 12, color: "#6b7280" },
  inventoryCount: { fontWeight: "bold", color: "#1f2937" },
  friendActionContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 16,
  },
  addButtonText: {
    color: "white",
    marginLeft: 5,
  },
  pendienteText: {
    color: "gray",
    fontWeight: "bold",
    marginLeft: 5,
  },
  friendsText: {
    color: "green",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default UserProfilePage;
