// src/components/FriendRequestsList.tsx
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { UserCheck, UserX, UserPlus } from "lucide-react-native";
import { AuthContext } from "./auth/AuthContext";
import { SolicitudAmistad } from "./auth/AuthContext";
import { getLevelInfo } from "@/functions/getLevelInfo";
import { Link } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function FriendRequestsList() {
  const [loading, setLoading] = useState(false);
  const { pendingFriends, SolicitudChange, DeleteSolicitud } =
    useContext(AuthContext);

  // Helper para pasar "2025-04-25" → "hace X días"
  const timeSince = (isoDate: string) => {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return days > 0 ? `hace ${days} día${days > 1 ? "s" : ""}` : "hoy";
  };

  if (!pendingFriends || pendingFriends.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconContainer}>
          <UserPlus size={32} color="#999" />
        </View>
        <Text style={styles.emptyText}>
          No tienes solicitudes de amistad pendientes
        </Text>
        <Text style={styles.emptySubtext}>
          Cuando alguien te envíe una solicitud, aparecerá aquí
        </Text>
      </View>
    );
  }

  return (
    <FlatList<SolicitudAmistad>
      data={pendingFriends}
      keyExtractor={(item) => item.id_amistad}
      renderItem={({ item }) => {
        const avatar = item?.solicitante?.image ?? undefined;
        const level = getLevelInfo(
          item?.solicitante?.puntuation || 0
        ).currentLevel;
        const name = item?.solicitante?.full_name ?? "Usuario";
        const username = item?.solicitante?.nickname ?? "";
        const since = timeSince(item.fecha_solicitud);

        return (
          <View style={styles.cardContainer}>
            <View style={styles.userInfo}>
              <View>
                <Image
                  source={{
                    uri:
                      avatar ||
                      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
                  }}
                  style={styles.avatar}
                />
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>{level}</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.metaRow}>
                  <Link href={`/user/${username}`} style={styles.username}>
                    @{username}
                  </Link>
                  <Text style={styles.separator1}>•</Text>
                  <Text style={styles.timeSince}>{since}</Text>
                </View>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={async () => {
                  setLoading(true);
                  await SolicitudChange(item?.id_amistad, "aceptada");

                  setLoading(false);
                }}
              >
                {loading ? (
                  <ActivityIndicator size={20} color="#fff" />
                ) : (
                  <UserCheck size={16} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                onPress={async () => {
                  setLoading(true);

                  await DeleteSolicitud(item?.id_amistad as string);
                  setLoading(false);
                }}
              >
                {loading ? (
                  <ActivityIndicator size={20} color="#fff" />
                ) : (
                  <UserX size={16} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  levelBadge: {
    position: "absolute",
    right: 0,
    bottom: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  levelText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  textContainer: {
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  username: {
    fontSize: 14,
    color: "#666",
  },
  separator1: {
    marginHorizontal: 4,
  },
  timeSince: {
    fontSize: 12,
    color: "#999",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  acceptButton: {
    backgroundColor: "#ec4899",
  },
  rejectButton: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 4,
    fontSize: 14,
  },
  rejectText: {
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 8,
  },
  emptyContainer: {
    alignItems: "center",
    padding: 20,
  },
  emptyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
});
