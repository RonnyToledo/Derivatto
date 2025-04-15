import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FriendSearchDialog from "@/components/friend-search-dialog";
import AntDesign from "@expo/vector-icons/AntDesign";
// Si deseas usar una barra de progreso:
import * as Progress from "react-native-progress";
import AchievementCard from "../../components/AchievementCard";
import { AuthContext } from "@/components/auth/AuthContext";

export default function ProfilePage() {
  const { user, signOut } = useContext(AuthContext);
  const [showFriendSearch, setShowFriendSearch] = useState<boolean>(false);
  const [loadingDelete, setloadingDelete] = useState<boolean>(false);
  const Delete = async () => {
    setloadingDelete(true);
    await signOut();
    setloadingDelete(false);
  };
  return (
    <View
      style={[
        styles.container,
        {
          maxWidth: 400,
          width: "100%",
          height: Dimensions.get("window").height,
        },
      ]}
    >
      {/* Contenido principal en ScrollView para que sea desplazable */}
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        {/* Tarjeta de perfil */}
        <View style={styles.profileCardWrapper}>
          <View style={styles.profileCardBackground} />

          <View style={styles.profileCard}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri:
                    user?.image ||
                    "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
                }}
                style={styles.avatarImage}
              />
              <View style={styles.avatarLevelBadge}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>28</Text>
              </View>
            </View>

            {/* Info Usuario */}
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

            {/* Nivel y progreso */}
            <View style={styles.progressContainer}>
              <View style={styles.progressLabelRow}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign name="star" color="#FFD700" size={16} />
                  <Text style={styles.progressLabel}> Nivel 28</Text>
                </View>
                <Text style={styles.progressSubLabel}>5640 / 6000 XP</Text>
              </View>
              {/* Barra de progreso con la librería react-native-progress */}
              <Progress.Bar
                progress={0.74}
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
                <Text style={styles.statLabel}>Victorias</Text>
                <Text style={styles.statValue}>{user?.victorias}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Amigos</Text>
                <Text style={styles.statValue}>{user?.amistades}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Ejemplo de Logros (Achievements) */}
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

        {/* Aquí podrías renderizar más secciones, inventario, etc. */}

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => Delete()}
          disabled={loadingDelete}
        >
          <AntDesign name="logout" color="#EF4444" size={20} />
          <Text style={styles.logoutButtonText}> Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
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
