import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BookOpen, ChevronRight } from "lucide-react-native";

interface LessonCardProps {
  title: string;
  description?: string;
  progress?: number;
  onPress: () => void;
}

export default function LessonCard({
  title,
  description,
  progress = 0,
  onPress,
}: LessonCardProps) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconAndText}>
          <View style={styles.iconContainer}>
            <BookOpen size={20} color="#ec4899" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{title}</Text>
            {description && (
              <Text style={styles.descriptionText}>{description}</Text>
            )}
          </View>
        </View>
        <ChevronRight size={20} color="#9ca3af" />
      </View>

      {progress > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressLabel}>
            <Text style={styles.progressText}>Progreso</Text>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    backgroundColor: "white",
    width: "100%",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Para que el texto ocupe el espacio disponible
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffe4e6", // Aproximación a bg-pink-100
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    flexWrap: "wrap", // Permite partir en varias líneas
  },
  titleText: {
    fontWeight: "500",
    fontSize: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: "#6b7280",
  },
  progressContainer: {
    marginTop: 12,
  },
  progressLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#6b7280",
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#f3f4f6",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#ec4899", // Aproximación a bg-pink-600
    borderRadius: 999,
  },
});
