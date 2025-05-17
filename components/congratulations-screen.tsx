"use client";

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Trophy, Star, Home, Share2 } from "lucide-react-native";
import Confetti from "./confetti";
import * as Progress from "react-native-progress";

interface CongratulationsScreenProps {
  score: number;
  totalPossibleScore: number;
  onGoHome: () => void;
}

export default function CongratulationsScreen({
  score,
  totalPossibleScore,
  onGoHome,
}: CongratulationsScreenProps) {
  const [showStars, setShowStars] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  // Calculate percentage score
  const percentage = score / totalPossibleScore;

  // Determine message based on score percentage
  const getMessage = () => {
    if (percentage >= 90)
      return "¡Excelente trabajo! Eres un genio matemático.";
    if (percentage >= 70)
      return "¡Muy bien hecho! Tienes un gran dominio de las matemáticas.";
    if (percentage >= 50)
      return "¡Buen trabajo! Sigue practicando para mejorar.";
    return "¡Lo lograste! Sigue practicando para mejorar tus habilidades.";
  };

  // Animate elements in sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setShowStars(true), 500);
    const timer2 = setTimeout(() => setShowMessage(true), 1200);
    const timer3 = setTimeout(() => setShowButtons(true), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  {
    useEffect(() => {
      const timer = setTimeout(() => {
        onGoHome();
      }, 30000);

      return () => clearTimeout(timer);
    }, [onGoHome]);
  }
  return (
    <View style={styles.container}>
      {/* Confetti animation */}
      <Confetti />

      {/* Trophy and stars */}
      <View style={styles.trophyContainer}>
        <View style={styles.trophyCircle}>
          <Trophy size={80} color="#FF981C" />
        </View>

        {showStars && (
          <>
            <View style={[styles.star, styles.star1]}>
              <Star size={32} color="#facc15" fill="#facc15" />
            </View>
            <View style={[styles.star, styles.star2]}>
              <Star size={24} color="#facc15" fill="#facc15" />
            </View>
            <View style={[styles.star, styles.star3]}>
              <Star size={28} color="#facc15" fill="#facc15" />
            </View>
          </>
        )}
      </View>

      {/* Congratulations text */}
      <View
        style={[
          styles.messageContainer,
          showMessage ? styles.visible : styles.hidden,
        ]}
      >
        <Text style={styles.title}>¡Felicidades!</Text>
        <Text style={styles.message}>{getMessage()}</Text>

        {/* Score display */}
        <View style={styles.scoreContainer}>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Puntuación final:</Text>
            <Text style={styles.scoreValue}>
              {score} / {totalPossibleScore}
            </Text>
          </View>
          <Progress.Bar
            progress={percentage}
            width={null}
            color="#FF981C"
            unfilledColor="#F2EAE1"
            borderWidth={0}
            height={8}
            style={styles.progress}
          />
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>
              {Math.round(percentage * 100)}%
            </Text>
          </View>
        </View>
      </View>

      {/* Action buttons */}
      <View
        style={[
          styles.buttonsContainer,
          showButtons ? styles.visible : styles.hidden,
        ]}
      >
        <TouchableOpacity onPress={onGoHome} style={styles.outlineButton}>
          <Home size={25} color="white" style={styles.iconButton} />
          <Text style={[styles.buttonText, { color: "white" }]}>
            Volver al inicio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.outlineButtonSecondary}>
          <Share2 size={25} color="#5F2641" style={styles.iconButton} />
          <Text style={[styles.buttonText, { color: "#5F2641" }]}>
            Compartir resultado
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#F2EAE1",
    zIndex: 50,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  trophyContainer: {
    marginBottom: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  trophyCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#FFDFD6",
    justifyContent: "center",
    alignItems: "center",
  },
  star: {
    position: "absolute",
  },
  star1: {
    top: -10,
    right: -10,
  },
  star2: {
    bottom: -5,
    left: -10,
  },
  star3: {
    top: -5,
    left: -15,
  },
  messageContainer: {
    alignItems: "center",
    marginBottom: 32,
    opacity: 0,
  },
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF981C",
    marginBottom: 8,
  },
  message: {
    fontSize: 18,
    color: "#374151",
    marginBottom: 16,
    textAlign: "center",
  },
  scoreContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF981C",
  },
  progress: {
    height: 8,
    backgroundColor: "#ffccd5",
    borderRadius: 4,
  },
  percentageContainer: {
    marginTop: 4,
    alignSelf: "flex-end",
  },
  percentageText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#ff4081",
  },
  buttonsContainer: {
    width: "80%",
    flexDirection: "column",
    gap: 12,
    opacity: 0,
  },
  primaryButton: {
    backgroundColor: "#ff4081",
    padding: 12,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButton: {
    padding: 12,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF981C",
  },
  outlineButtonSecondary: {
    borderWidth: 1,
    borderColor: "#5F2641",
    padding: 12,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  iconButton: {
    marginRight: 8,
  },
});
