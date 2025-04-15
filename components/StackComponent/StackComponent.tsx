import { View, Text, Pressable } from "react-native";
import { useRouter, Stack, usePathname, useSegments } from "expo-router";
import React, { useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Flame, Gem, Heart, ArrowLeft } from "lucide-react-native";
import { AuthContext } from "@/components/auth/AuthContext";
import { StyleSheet } from "react-native";

export default function StackComponent() {
  const { user } = useContext(AuthContext);

  const router = useRouter();
  const segments = useSegments();
  const isExRoute = segments[0] === "ex";
  const isUserRoute = segments[0] === "user";
  const isLoginRoute = segments[0] === "login";
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerItem}>
        <Flame color="red" size={24} fill="orange" style={styles.headerIcon} />
        <Text
          style={[
            styles.headerText,
            { fontSize: 20, color: "red", fontWeight: "500" },
          ]}
        >
          {user?.racha || 0}
        </Text>
      </View>
      <View style={styles.headerItem}>
        <Gem
          size={24}
          fill="#1daff6"
          color="#10879c"
          style={styles.headerIcon}
        />
        <Text
          style={[
            styles.headerText,
            { fontSize: 20, color: "#1daff6", fontWeight: "500" },
          ]}
        >
          {user?.gemas || 0}
        </Text>
      </View>
      <View style={styles.headerItem}>
        <Heart size={24} fill="red" color="brown" style={styles.headerIcon} />
        <Text
          style={[
            styles.headerText,
            { fontSize: 20, color: "red", fontWeight: "500" },
          ]}
        >
          {user?.vidas || 0}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    height: 64,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  headerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 16,
  },
});
