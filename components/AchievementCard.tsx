import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Progress from "react-native-progress";

interface AchievementCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  progress: number;
}

export default function AchievementCard({
  title,
  description,
  icon,
  progress,
}: AchievementCardProps) {
  const completed = progress === 100;
  return (
    <View style={styles.card}>
      {completed && (
        <View style={styles.completedIcon}>
          <AntDesign name="checkcircle" color="#10B981" size={10} />
        </View>
      )}

      <View style={styles.topRow}>
        <View style={styles.iconContainer}>{icon}</View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>{progress}%</Text>
          {completed && <Text style={styles.completedText}>Completado</Text>}
        </View>
        <Progress.Bar
          progress={progress / 100}
          width={null}
          color={completed ? "#10B981" : "#3B82F6"}
          unfilledColor="#E5E7EB"
          borderWidth={0}
          height={6}
          style={{ borderRadius: 3 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    width: "48%", // Para que quepan dos en fila (ejemplo)
    position: "relative",
  },
  completedIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  title: {
    fontWeight: "600",
    fontSize: 10,
  },
  description: {
    fontSize: 8,
    color: "#6B7280",
  },
  progressSection: {
    marginTop: 4,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#6B7280",
  },
  completedText: {
    fontSize: 12,
    color: "#10B981",
  },
});
