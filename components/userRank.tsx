import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

interface UserRankCardProps {
  rank: number;
  name: string;
  score: number;
  level: number;
  avatar: string;
  isCurrentUser: boolean;
}

export default function UserRankCard({
  rank,
  name,
  score,
  level,
  avatar,
  isCurrentUser,
}: UserRankCardProps) {
  // Determina el ícono de la medalla según la posición
  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Ionicons name="medal-sharp" size={24} color="yellow" />;
      case 2:
        return <Ionicons name="medal-sharp" size={24} color="gray" />;
      case 3:
        return <Ionicons name="medal-sharp" size={24} color="amber" />;
      default:
        // Para puestos 4, 5, etc., muestra un círculo con el número
        return (
          <View style={styles.rankDefault}>
            <Text style={styles.rankDefaultText}>{position}</Text>
          </View>
        );
    }
  };

  return (
    <View
      style={[
        styles.container,
        isCurrentUser ? styles.currentUser : styles.defaultUser,
      ]}
    >
      <View style={styles.row}>
        {/* Ícono de rango/medalla */}
        <View style={styles.rankIconContainer}>{getRankIcon(rank)}</View>

        {/* Avatar + Nivel */}
        <View style={styles.imageContainer}>
          <Image
            // En RN se usa source={{ uri: "..." }} para imágenes remotas
            source={
              avatar ? { uri: avatar } : require("../assets/placeholder.png")
            }
            style={styles.avatar}
          />
          <Text style={styles.levelText}>{level}</Text>
        </View>

        {/* Nombre + Puntaje */}
        <View style={styles.infoRow}>
          <Text
            style={[
              styles.nameText,
              isCurrentUser
                ? styles.currentUserNameText
                : styles.defaultUserNameText,
            ]}
          >
            {name}
          </Text>
          <View style={styles.scoreContainer}>
            <AntDesign name="star" size={24} color="yellow" />
            <Text style={styles.scoreText}>{score.toLocaleString()} pts</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor principal
  container: {
    alignItems: "center",
    padding: 12, // p-3 => 12px
    borderRadius: 8, // rounded-lg
  },
  currentUser: {
    backgroundColor: "#FCE7F3", // bg-pink-50
    borderWidth: 1,
    borderColor: "#FBCFE8", // border-pink-200
  },
  defaultUser: {
    backgroundColor: "#FFFFFF", // bg-white
    borderWidth: 1,
    borderColor: "#F3F4F6", // border-gray-100
  },

  // Fila principal (rank, avatar, info)
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 12, // p-3
  },
  rankIconContainer: {
    // Equivale a "flex-shrink-0" en Web, que no existe en RN
  },

  // Avatar + Nivel
  imageContainer: {
    position: "relative",
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 9999, // rounded-full
    borderWidth: 2,
    borderColor: "#E5E7EB", // border-gray-200
  },
  levelText: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#3B82F6", // bg-blue-500
    color: "#FFFFFF",
    fontSize: 12, // text-xs
    borderRadius: 9999, // rounded-full
    width: 20,
    height: 20,
    textAlign: "center",
    textAlignVertical: "center", // Centrado vertical en Android
    fontWeight: "bold",
  },

  // Nombre + Puntaje
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 4, // ml-1 => 4px
    width: "100%",
  },
  nameText: {
    fontWeight: "600", // font-semibold
  },
  currentUserNameText: {
    color: "#DB2777", // text-pink-600
  },
  defaultUserNameText: {
    color: "#1F2937", // text-gray-800
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    // text-xs => fontSize en el texto
  },
  scoreText: {
    fontSize: 12,
    color: "#6B7280", // text-gray-500
    marginLeft: 4,
  },

  // Estilo para los puestos que no son 1, 2, 3
  rankDefault: {
    width: 24, // w-6 => 24px
    height: 24, // h-6 => 24px
    borderRadius: 12, // rounded-full
    backgroundColor: "#E5E7EB", // bg-gray-200
    alignItems: "center",
    justifyContent: "center",
  },
  rankDefaultText: {
    color: "#374151", // text-gray-700
    fontWeight: "bold",
    fontSize: 12, // text-xs
  },
});
