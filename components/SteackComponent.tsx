import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from "react-native";
import { Calendar, Award } from "lucide-react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import Fire from "@/assets/Icons/Icons/SVG/fire.svg";

interface StreakAnimationProps {
  previousStreak: number;
  newStreak: number;
  onComplete: () => void;
}

export default function StreakAnimation({
  previousStreak,
  newStreak,
  onComplete,
}: StreakAnimationProps) {
  const [count, setCount] = useState(previousStreak);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  // Animated values
  const flameAnim = useRef(new Animated.Value(0)).current;
  const counterAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence animations: flame, counter, text, button
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(flameAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(400),
      Animated.timing(counterAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.delay(300),
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Counter increment logic after a delay
    const counterDelay = setTimeout(() => {
      let current = previousStreak;
      const interval = setInterval(() => {
        if (current < newStreak) {
          current += 1;
          setCount(current);
        } else {
          clearInterval(interval);
          setShowConfetti(true);
        }
      }, 100);
    }, 2000);

    // Show badge for milestone streaks
    let badgeTimeout: NodeJS.Timeout | null = null;
    if ([7, 30, 100].includes(newStreak)) {
      badgeTimeout = setTimeout(() => setShowBadge(true), 3000);
    }

    return () => {
      clearTimeout(counterDelay);
      if (badgeTimeout) clearTimeout(badgeTimeout);
    };
  }, [previousStreak, newStreak, buttonAnim, counterAnim, flameAnim, textAnim]);

  const encouragement = getEncouragementMessage(newStreak);
  const { width } = useWindowDimensions();

  return (
    <View style={styles.overlay}>
      {/* Flame Animation */}
      <Animated.View
        style={[
          styles.flameContainer,
          {
            opacity: flameAnim,
            transform: [
              {
                scale: flameAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.flameCircle}>
          <Fire width={60} />
        </View>
        <Animated.View
          style={[
            styles.calendarBadge,
            { opacity: flameAnim, transform: [{ scale: flameAnim }] },
          ]}
        >
          <Calendar size={24} color="#FFFFFF" />
        </Animated.View>
      </Animated.View>

      {/* Counter */}
      <Animated.View
        style={[
          styles.counterContainer,
          {
            opacity: counterAnim,
            transform: [
              {
                translateY: counterAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.counterBox}>
          <Text style={styles.counterText}>{count}</Text>
          {newStreak > previousStreak && (
            <Text style={styles.incrementText}>+{count - previousStreak}</Text>
          )}
        </View>
        <Text style={styles.subtitle}>Días en racha</Text>
      </Animated.View>

      {/* Congratulation Text */}
      <Animated.View
        style={[
          styles.messageContainer,
          {
            opacity: textAnim,
            transform: [
              {
                translateY: textAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.title}>
          {newStreak > previousStreak
            ? "¡Racha aumentada!"
            : "¡Racha mantenida!"}
        </Text>
        <Text style={styles.message}>{encouragement}</Text>
      </Animated.View>

      {/* Confetti */}
      {showConfetti && (
        <ConfettiCannon count={100} origin={{ x: width / 2, y: 0 }} />
      )}

      {/* Continue Button */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: buttonAnim,
            transform: [
              {
                translateY: buttonAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity style={styles.button} onPress={onComplete}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Milestone Badge */}
      {showBadge && (
        <Animated.View style={styles.badgeContainer}>
          <Award size={20} color="#FFFFFF" />
          <Text
            style={styles.badgeText}
          >{`¡Logro desbloqueado: ${newStreak} días!`}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FF981C",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    zIndex: 999,
  },
  flameContainer: { alignItems: "center", justifyContent: "center" },
  flameCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "#FFB580",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarBadge: {
    position: "absolute",
    top: -12,
    right: -12,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF981C",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  counterContainer: { marginTop: 40, alignItems: "center" },
  counterBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  counterText: { fontSize: 48, fontWeight: "bold", color: "#FF981C" },
  incrementText: { marginLeft: 8, fontSize: 24, color: "#BAE639" },
  subtitle: { marginTop: 8, fontSize: 18, color: "rgba(255,255,255,0.9)" },
  messageContainer: { marginTop: 32, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#FFFFFF" },
  message: {
    marginTop: 8,
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },
  buttonContainer: { marginTop: 40 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#5F2641",
  },
  badgeContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBBF24",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  badgeText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

// Helper function
function getEncouragementMessage(streakCount: number): string {
  if (streakCount === 1) return "¡Primer día! El comienzo de un gran hábito.";
  if (streakCount < 3) return "¡Buen comienzo! Sigue practicando diariamente.";
  if (streakCount < 7)
    return "¡Estás en racha! Mantén tu ritmo de aprendizaje.";
  if (streakCount < 14) return "¡Impresionante! Ya llevas más de una semana.";
  if (streakCount < 30)
    return "¡Increíble dedicación! Estás creando un hábito sólido.";
  if (streakCount < 60) return "¡Todo un mes de práctica! Eres excepcional.";
  if (streakCount < 100)
    return "¡Tu constancia es admirable! Sigue rompiendo récords.";
  return "¡100+ días! Eres una leyenda de las matemáticas.";
}
