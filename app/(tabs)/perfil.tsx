import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Progress from "react-native-progress";
import FriendSearchDialog from "@/components/friend-search-dialog";
import AchievementCard from "@/components/AchievementCard";
import { AuthContext, UserProfile } from "@/components/auth/AuthContext";
import { getLevelInfo } from "@/functions/getLevelInfo";
import { supabase } from "@/libs/supabase";
import ScrollViewReload from "@/components/ScrollViewReload";
import FriendRequestsList from "@/components/FriendsSolicitudes";

export default function ProfilePage() {
  const { user, setUser, signOut } = useContext(AuthContext);
  const [showFriendSearch, setShowFriendSearch] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSignOut = async () => {
    setLoadingDelete(true);
    await signOut();
    setLoadingDelete(false);
  };

  async function uploadToCloudinary() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") throw new Error("Permiso denegado");

    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
    if (result.canceled) return;

    // 1) convertir URI a blob
    const blob = await (await fetch(result.assets[0].uri)).blob();

    // 2) preparar FormData
    const formdata = new FormData();
    formdata.append("file", blob);
    formdata.append("upload_preset", "unsigned"); // tu preset unsigned
    setUploading(true);
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dsymecvtw/image/upload",
        {
          method: "POST",
          body: formdata,
        }
      );
      const json = await res.json();
      console.info("URL subida:", json.secure_url, user?.id);
      const { data: userUpdate, error } = await supabase
        .from("profiles")
        .update({
          image: json.secure_url,
        })
        .eq("id", user?.id)
        .select("*")
        .single();

      if (error) {
        console.error("Error al actualizar imagen:", error);
        throw error;
      }
      console.info(userUpdate);
      setUser(userUpdate as UserProfile);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    } finally {
      setUploading(false);
    }
  }

  const lvlInfo = getLevelInfo(user?.puntuation ?? 0);

  return (
    <View style={[styles.container, { height: useWindowDimensions().height }]}>
      <ScrollViewReload style={{ flex: 1 }}>
        <View style={styles.profileCardWrapper}>
          <View style={styles.profileCardBackground} />
          <View style={styles.profileCard}>
            {/* Avatar con onPress */}
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={uploadToCloudinary}
              disabled={uploading}
            >
              <Image
                source={{
                  uri:
                    user?.image ||
                    "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
                }}
                style={styles.avatarImage}
              />
              {uploading && (
                <ActivityIndicator
                  style={StyleSheet.absoluteFill}
                  size="small"
                  color="#EC4899"
                />
              )}
              <View style={styles.avatarLevelBadge}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {lvlInfo.currentLevel}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Resto de tu UI */}
            <View style={styles.userInfo}>
              <View style={styles.userInfoHeader}>
                <View>
                  <Text style={styles.userName}>{user?.full_name}</Text>
                  <Text style={styles.userName2}>@{user?.nickname}</Text>
                  <Text style={styles.userSince}>
                    Miembro desde {formatFecha(user?.creado || "")}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.addFriendButton}
                  onPress={() => setShowFriendSearch(!showFriendSearch)}
                >
                  <AntDesign name="adduser" color="#fff" size={16} />
                  <Text style={styles.addFriendButtonText}>Buscar Amigos</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Progreso de nivel */}
            <View style={styles.progressContainer}>
              <View style={styles.progressLabelRow}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign name="star" color="#FFD700" size={16} />
                  <Text style={styles.progressLabel}>
                    Nivel {lvlInfo.currentLevel}
                  </Text>
                </View>
                <Text style={styles.progressSubLabel}>
                  {user?.puntuation} / {lvlInfo.nextLevelScore} XP
                </Text>
              </View>
              <Progress.Bar
                progress={(user?.puntuation ?? 0) / lvlInfo.nextLevelScore}
                width={null}
                color="#FF00FF"
                unfilledColor="#f3f3f3"
                borderWidth={0}
                height={8}
                style={{ borderRadius: 4 }}
              />
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Partidas</Text>
                <Text style={styles.statValue}>{user?.partidas}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Impecables</Text>
                <Text style={styles.statValue}>{user?.victorias}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Amigos</Text>
                <Text style={styles.statValue}>{user?.amistades}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Logros */}
        <View>
          <Text style={styles.sectionTitle}>Logros</Text>
          <View style={styles.achievementsGrid}>
            <AchievementCard
              title="Primer Victoria"
              description="Gana tu primera partida"
              icon={<AntDesign name="star" color="#FFD700" size={24} />}
              progress={100}
            />
            <AchievementCard
              title="Coleccionista"
              description="Obtén 10 objetos diferentes"
              icon={<AntDesign name="star" color="#8B5CF6" size={24} />}
              progress={80}
            />
          </View>
        </View>

        <View style={styles.headingContent}>
          <Text style={styles.heading}>Solicitudes de amistad</Text>
          <FriendRequestsList />
        </View>

        {/* Cerrar sesión */}
        <View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleSignOut}
            disabled={loadingDelete}
          >
            <AntDesign name="logout" color="#EF4444" size={20} />
            <Text style={styles.logoutButtonText}> Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollViewReload>

      <FriendSearchDialog
        open={showFriendSearch}
        onOpenChange={setShowFriendSearch}
      />
    </View>
  );
}

export const formatFecha = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#EC4899",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    marginLeft: 8,
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  headerIconButton: {
    padding: 8,
  },
  headingContent: {
    padding: 10,
  },
  heading: {
    fontSize: 15, // equivalente aproximado a un h3
    fontWeight: "500", // font-medium
    color: "#4A5568", // text-gray-700
    marginBottom: 5, // mb-3 (3 * 4px)
  },
  profileCardWrapper: {
    marginBottom: 16,
  },
  profileCardBackground: {
    height: 80,
    backgroundColor: "#EC4899",
  },
  profileCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    marginTop: -40,
    elevation: 2, // sombra en Android
    shadowColor: "#000", // sombra en iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    position: "absolute",
    top: -20,
    left: 16,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  avatarLevelBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    marginLeft: 96, // para dejar espacio al avatar
    marginTop: 4,
  },
  userInfoHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 2,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  userName2: {
    fontWeight: "semibold",
    fontSize: 14,
  },
  userSince: {
    color: "#6B7280",
    fontSize: 12,
  },
  addFriendButton: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#EC4899",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    textAlign: "center",
    borderRadius: 4,
  },
  addFriendButtonText: {
    color: "#fff",
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: 50,
  },
  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressLabel: {
    marginLeft: 4,
    fontSize: 12,
    color: "#444",
  },
  progressSubLabel: {
    fontSize: 12,
    color: "#888",
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  statValue: {
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 16,
    justifyContent: "space-between",
  },
  logoutButton: {
    margin: 16,
    borderWidth: 1,
    borderColor: "#EF4444",
    padding: 12,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#EF4444",
    marginLeft: 8,
    fontWeight: "600",
  },
});
