import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Progress from "react-native-progress";
import { Heart } from "lucide-react-native";
import { AuthContext } from "../auth/AuthContext";

export default function ProgressLevel() {
  const { user } = useContext(AuthContext);

  return (
    <Progress.Bar
      progress={(user?.progress || 0) / 15}
      animated={true}
      width={200}
      color="#FF981C"
      height={16}
      style={styles.progress}
    />
  );
}
export function Vidas() {
  const { user } = useContext(AuthContext);
  return (
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
  );
}
const styles = StyleSheet.create({
  progress: {
    backgroundColor: "#F2EAE1",
    borderRadius: 8,
  },
  headerItem: {
    paddingHorizontal: 10,
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
