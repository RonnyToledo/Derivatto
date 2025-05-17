import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MathFormula from "@/components/math-formula";
import ExerciseOption from "@/components/exercise-option";
import {
  useLocalSearchParams,
  useRouter,
  useRootNavigationState,
} from "expo-router";
import { ejercicioFinish } from "@/assets/exe";
import CongratulationsScreen from "@/components/congratulations-screen";
import UIExample from "@/components/UIExample";
import { ChevronDown, ChevronRight } from "lucide-react-native";
import ModalComponent from "@/components/global/modal";
import { AuthContext, UserProfile } from "@/components/auth/AuthContext";
import { supabase } from "@/libs/supabase";
import { getLevelInfo } from "@/functions/getLevelInfo";
import PushableButton from "@/components/botonDynamic";
import { darkenColor } from "@/functions/tinycolors";
import StreakAnimation from "@/components/SteackComponent";

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

type DifficultyName = "easy" | "medium" | "hard";

const getExercisesByKey = (key: string) => {
  for (const { title, ej } of ejercicioFinish) {
    if (key in ej) return { title, ejercicio: ej[key] };
  }
  return { title: "", ejercicio: [] as Exercise[] };
};

const getOptimalTime = (difficulty: DifficultyName) =>
  ({ easy: 60, medium: 90, hard: 120 })[difficulty] ?? 90;

export default function MathExercisesPage() {
  const router = useRouter();
  const rootState = useRootNavigationState();
  const navigatorReady = !!rootState?.key;
  const { user, setUser } = useContext(AuthContext);
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
  const [showStreakAnim, setShowStreakAnim] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [prevStreak, setPrevStreak] = useState<number>(user?.racha || 0);
  const [newStreakValue, setNewStreakValue] = useState<number>(
    user?.racha || 0
  );
  const { ui } = useLocalSearchParams<{ ui: string }>();

  // 2) Redirigir si el usuario se queda sin vidas
  useEffect(() => {
    if (!navigatorReady) return;
    if (user?.vidas === 0) {
      router.replace("/");
    }
  }, [navigatorReady, user?.vidas, router]);

  const exercises = getExercisesByKey(ui)?.ejercicio;
  const currentExercises = exercises || [];
  const currentExercise =
    currentExercises[currentExerciseIndex] || ({} as Exercise);

  const handleOptionSelect = async (optionIndex: number) => {
    if (showFeedback || !user) return;
    setLoading(true);

    const now = Date.now();
    let timeTaken = 0;
    if (exerciseStartTime !== null) {
      timeTaken = (now - exerciseStartTime) / 1000;
      setCurrentTimeTaken(timeTaken);
      setTimesTaken([...timesTaken, timeTaken]);
    }

    const correct = optionIndex === Number(currentExercise.correctAnswer);
    setSelectedOption(optionIndex);
    setIsCorrect(correct);

    const newProgress = (user.progress || 0) + 1;
    const newVidas = correct ? user.vidas : (user.vidas || 1) - 1;

    setUser({
      ...user,
      progress: newProgress,
      vidas: newVidas,
    });

    if (correct) {
      const basePoints = 2;
      const optimalTime = getOptimalTime(currentExercise.difficulty);
      const timeBonus = timeTaken < optimalTime ? 1 : 0;
      setcount(count + basePoints + timeBonus);
    } else {
      if (newVidas <= 0) {
        router.replace("/");
      }
      const { data, error } = await supabase
        .from("profiles")
        .update({ vidas: newVidas })
        .eq("id", user.id)
        .select("*")
        .single();
      if (error) {
        console.error("Error restando vida:", error);
      } else {
        console.info("Actualización exitosa:", data);
      }
    }
    setShowFeedback(true);
    setLoading(false);
  };

  const handleNextExercise = async () => {
    if (
      currentExerciseIndex < exercises.length - 1 &&
      (isCorrect || showFeedback)
    ) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else if (currentExerciseIndex === exercises.length - 1) {
      await finishGame();
    }
    setSelectedOption(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setShowProcedure(false);
    setCurrentTimeTaken(null);
  };

  const difficulty = getDifficulty(currentExercise.difficulty).title;

  useEffect(() => {
    if (recordDifficulty && difficulty) {
      if (difficulty !== recordDifficulty) {
        setRecordDifficulty(difficulty);
        setShowTutorial(true);
      } else {
        setShowTutorial(false);
      }
    }
  }, [difficulty, recordDifficulty]);

  useEffect(() => {
    if (!showTutorial) {
      setExerciseStartTime(Date.now());
    }
  }, [showTutorial, currentExerciseIndex]);

  /* 
 Este codigo es para la web y poder responder las preguntas a partir del teclado
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
  }, [showTutorial]);*/

  const finishGame = async () => {
    const oldStreak = user?.racha || 0;
    const totalPossible = exercises.length * 3;
    const perfect = count === totalPossible;
    const oldLevel = getLevelInfo(user?.puntuation || 0).currentLevel;
    const newLevel = getLevelInfo((user?.puntuation || 0) + count).currentLevel;
    const protection = newLevel > oldLevel;

    setLoading(true);
    const { data, error } = await supabase.rpc("rpc_actualizar_stats", {
      p_user_id: user?.id,
      p_puntuacion: count,
      p_gemas: protection ? newLevel * 5 : 0,
      p_perfect: perfect,
      p_proteccion: (user?.proteccion || 0) >= 2 ? protection : false,
    });
    console.info("stast actualizados", data);

    if (error) {
      console.error(error);
    } else {
      console.info("Estado actulaizado");
    }

    const result = data?.[0] || {};

    const updatedStreak = result.next_racha ?? oldStreak;

    setPrevStreak(oldStreak);
    setNewStreakValue(updatedStreak);
    // Update context
    setUser({ ...(user as UserProfile), progress: 0 });
    // Trigger streak animation if increased
    console.log("streak animacion", updatedStreak, oldStreak);
    if (updatedStreak > oldStreak) {
      setShowStreakAnim(true);
    } else {
      setFinished(true);
    }
    setLoading(false);
  };

  // Show streak animation first
  if (showStreakAnim) {
    return (
      <StreakAnimation
        previousStreak={prevStreak}
        newStreak={newStreakValue}
        onComplete={() => {
          setShowStreakAnim(false);
          setFinished(true);
        }}
      />
    );
  }

  // After streak or if no streak, show congratulations
  if (finished) {
    return (
      <CongratulationsScreen
        score={count}
        totalPossibleScore={exercises.length * 3}
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
            {!currentExercise.question.includes(currentExercise.formula) && (
              <MathFormula formula={currentExercise.formula} />
            )}
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
                disabled={showFeedback || selectedOption !== null}
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
          <PushableButton
            title={"Siguiente"}
            color={"#FF981C"}
            width={100}
            height={50}
            style={{ width: "100%" }}
            darkColor={darkenColor("#FF981C", 20)}
            onPress={
              showTutorial ? () => setShowTutorial(false) : handleNextExercise
            }
            disabled={!(showTutorial || isCorrect || showFeedback)}
            fontSize={16}
            loading={Loading}
          />
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
  container: { flex: 1, backgroundColor: "#F2EAE1" },
  containerTop: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: { padding: 16 },
  category: {
    fontSize: 25,
    color: "#FF981C",
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
    backgroundColor: "#FF981C",
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
