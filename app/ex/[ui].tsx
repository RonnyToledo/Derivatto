import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MathFormula from "@/components/math-formula";
import ExerciseOption from "@/components/exercise-option";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ejercicioFinish } from "@/assets/exe";
import CongratulationsScreen from "@/components/congratulations-screen";
import UIExample from "@/components/UIExample";
import { ChevronDown, ChevronRight } from "lucide-react-native";
import ModalComponent from "@/components/global/modal";

interface Exercise {
  question: string;
  formula: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint?: string;
  procedure?: string[];
  difficulty: string;
}

interface Difficulty {
  title: string;
  color: string;
}

function getExercisesByKey(key: string) {
  for (const category of ejercicioFinish) {
    if (Object.prototype.hasOwnProperty.call(category.ej, key)) {
      return { title: category.title, ejercicio: category.ej[key] };
    }
  }
  return null;
}

function getOptimalTime(difficulty: string): number {
  switch (difficulty) {
    case "easy":
      return 60;
    case "medium":
      return 90;
    case "hard":
      return 120;
    default:
      return 90;
  }
}

export default function MathExercisesPage() {
  const router = useRouter();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showTutorial, setShowTutorial] = useState<boolean | null>(true);
  const [recordDifficulty, setRecordDifficulty] = useState<string | null>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showProcedure, setShowProcedure] = useState(false);
  const [count, setcount] = useState<number>(0);
  const [exerciseStartTime, setExerciseStartTime] = useState<number | null>(
    null
  );
  const [currentTimeTaken, setCurrentTimeTaken] = useState<number | null>(null);
  const [timesTaken, setTimesTaken] = useState<number[]>([]);

  const { ui } = useLocalSearchParams();
  if (!ui || typeof ui !== "string") {
    return null;
  }
  const exercises = getExercisesByKey(ui)?.ejercicio;
  const currentExercises = exercises || [];
  const currentExercise =
    currentExercises[currentExerciseIndex] || ({} as Exercise);

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;
    const endTime = Date.now();
    if (exerciseStartTime !== null) {
      const timeTaken = (endTime - exerciseStartTime) / 1000;
      setCurrentTimeTaken(timeTaken);
      setTimesTaken((prev) => [...prev, timeTaken]);
    }
    setSelectedOption(optionIndex);
    const correct = optionIndex == Number(currentExercise.correctAnswer);
    setIsCorrect(correct);
    if (correct) {
      const basePoints = 2;
      const optimalTime = getOptimalTime(currentExercise.difficulty);
      const timeBonus =
        currentTimeTaken !== null && currentTimeTaken < optimalTime ? 1 : 0;
      setcount(count + basePoints + timeBonus);
    }
    setShowFeedback(true);
  };

  const handleNextExercise = () => {
    if (
      currentExerciseIndex < currentExercises.length - 1 &&
      (isCorrect || showFeedback)
    ) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (currentExerciseIndex === currentExercises.length - 1) {
      setFinished(true);
    }
    setSelectedOption(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setShowProcedure(false);
    setCurrentTimeTaken(null);
  };

  const difficulty = getDifficulty(currentExercise.difficulty).title;

  useEffect(() => {
    if (difficulty != recordDifficulty) {
      setRecordDifficulty(difficulty);
      setShowTutorial(true);
    } else {
      setShowTutorial(false);
    }
  }, [difficulty]);

  useEffect(() => {
    if (!showTutorial) {
      setExerciseStartTime(Date.now());
    }
  }, [showTutorial, currentExerciseIndex]);

  useEffect(() => {
    if (Platform.OS === "web" && !showTutorial) {
      const handleKeyPress = (event: KeyboardEvent) => {
        const num = parseInt(event.key, 10);
        if (!isNaN(num) && num >= 1 && num <= 4) {
          handleOptionSelect(num - 1);
        }
      };
      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [showTutorial]);

  if (finished) {
    return (
      <CongratulationsScreen
        score={count}
        totalPossibleScore={currentExercises.length * 3}
        onGoHome={() => router.push("/")}
      />
    );
  }

  return (
    <View style={styles.container}>
      {showTutorial ? (
        <UIExample
          topic={removeTrailingNumber(ui)}
          difficulty={getDifficulty(
            currentExercise.difficulty
          ).title.toLowerCase()}
          onClick={() => setShowTutorial(false)}
          allContent={false}
        />
      ) : (
        <ScrollView style={styles.content}>
          <View style={[styles.container, styles.containerTop]}>
            <Text style={styles.category}>{getExercisesByKey(ui)?.title}</Text>
            <Text
              style={[
                styles.difficulty,
                { color: getDifficulty(currentExercise.difficulty).color },
              ]}
            >
              {difficulty}
            </Text>
          </View>
          <View
            style={{ width: "100%", flex: 1, margin: 5, minHeight: "auto" }}
          >
            <MathFormula formula={currentExercise.question} />
          </View>
          <View
            style={{ width: "100%", flex: 1, margin: 5, minHeight: "auto" }}
          >
            <MathFormula formula={currentExercise.formula} />
          </View>
          {currentExercise.options?.map((option: string, index: number) => (
            <View key={index}>
              <ExerciseOption
                option={option}
                index={index}
                selected={selectedOption === index}
                correct={
                  showFeedback
                    ? index === currentExercise.correctAnswer
                    : undefined
                }
                onClick={() => handleOptionSelect(index)}
                disabled={showFeedback}
              />
            </View>
          ))}
        </ScrollView>
      )}
      <ModalComponent
        title="Explicacion"
        onOpenChange={() => setShowProcedure(false)}
        open={showProcedure}
      >
        <View style={styles.procedureContent}>
          <Text style={styles.procedureTitle}>Procedimiento paso a paso:</Text>
          {currentExercise.procedure?.map((step: string, index: number) => (
            <View key={index} style={styles.procedureStep}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>
              <MathFormula formula={step} />
            </View>
          ))}
        </View>
      </ModalComponent>
      <View style={styles.navigationFotter}>
        {showFeedback && (
          <View
            style={[
              styles.feedback,
              isCorrect ? styles.correct : styles.incorrect,
            ]}
          >
            <View style={styles.col}>
              <View style={styles.row}>
                {isCorrect ? (
                  <AntDesign name="check" size={24} color="green" />
                ) : (
                  <Feather name="x" size={24} color="red" />
                )}
                <Text style={styles.feedbackText}>
                  {isCorrect
                    ? "¡Correcto!"
                    : `Incorrecto. La respuesta correcta es ${
                        currentExercise.correctAnswer + 1
                      }`}
                </Text>
              </View>
              {currentTimeTaken !== null && (
                <Text style={styles.feedbackText}>
                  Tiempo empleado: {currentTimeTaken.toFixed(2)} segundos
                </Text>
              )}
              {currentExercise.explanation ? (
                <Text style={styles.explanationText}>
                  <MathFormula formula={currentExercise.explanation} />
                </Text>
              ) : null}
              {!isCorrect && currentExercise.procedure ? (
                <View style={styles.procedureContainer}>
                  <TouchableOpacity
                    style={styles.procedureButton}
                    onPress={() => setShowProcedure(!showProcedure)}
                  >
                    <Text style={styles.procedureButtonText}>
                      Ver procedimiento detallado
                    </Text>
                    {showProcedure ? (
                      <ChevronDown style={styles.chevronIcon} />
                    ) : (
                      <ChevronRight style={styles.chevronIcon} />
                    )}
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
        )}
        <View style={styles.navigation}>
          <TouchableOpacity
            style={[
              styles.navButton,
              styles.nextButton,
              !(showTutorial || isCorrect || showFeedback) &&
                styles.disabledButton,
            ]}
            onPress={
              showTutorial ? () => setShowTutorial(false) : handleNextExercise
            }
            disabled={!(showTutorial || isCorrect || showFeedback)}
          >
            <Text style={styles.navButtonText}>Siguiente</Text>
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function getDifficulty(name: string): Difficulty {
  switch (name) {
    case "easy":
      return { title: "Facil", color: "green" };
    case "medium":
      return { title: "Medio", color: "#a77d0b" };
    case "hard":
      return { title: "Dificil", color: "red" };
    default:
      return { title: "none", color: "grey" };
  }
}

function removeTrailingNumber(input: string): string {
  const parts = input.split("-");
  if (parts.length > 1) {
    const lastPart = parts[parts.length - 1];
    if (!isNaN(parseInt(lastPart))) {
      parts.pop();
      return parts.join("-");
    }
  }
  return input;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  containerTop: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  content: { padding: 16 },
  category: {
    fontSize: 25,
    color: "#ff4081",
    marginBottom: 8,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  col: {
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  explanationText: {
    fontSize: 14,
    marginTop: 8,
  },
  procedureContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#FECACA",
    paddingTop: 12,
  },
  procedureButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  chevronIcon: {
    marginRight: 4,
    color: "#B91C1C",
  },
  procedureButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#B91C1C",
  },
  procedureContent: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    padding: 12,
  },
  procedureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1F2937",
  },
  procedureStep: {
    flexDirection: "row",
    marginBottom: 8,
  },
  stepNumber: {
    marginRight: 8,
    fontWeight: "bold",
  },
  difficulty: { fontSize: 16, marginBottom: 8, fontWeight: "300" },
  question: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  feedback: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  correct: { backgroundColor: "#e8f5e9" },
  incorrect: { backgroundColor: "#ffebee" },
  feedbackText: { marginLeft: 8 },
  navigationFotter: {
    padding: 16,
    gap: 16,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    textAlign: "center",
    gap: 4,
  },
  nextButton: {
    backgroundColor: "#ff4081",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    width: "100%",
    gap: 8,
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "rgb(180,180,180)",
  },
  navButtonText: {
    fontWeight: "700",
    color: "white",
  },
});
