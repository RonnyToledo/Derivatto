import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  findNodeHandle,
  Pressable,
} from "react-native";
import { Book, ChevronLeft, Lightbulb, ArrowRight } from "lucide-react-native";
import Accordion from "react-native-collapsible/Accordion";
import MathFormula from "@/components/math-formula";
import LessonCard from "@/components/lesson-card";
import { topicData } from "@/libs/learning-data";
import { useRouter, useGlobalSearchParams } from "expo-router";
import ScrollViewReload from "@/components/ScrollViewReload";
import Learn_matrices from "@/assets/Icons/Icons/SVG/learn_matrices.svg";
import Learn_vectors from "@/assets/Icons/Icons/SVG/learn_vectors.svg";
import Learn_limits from "@/assets/Icons/Icons/SVG/learn_limits.svg";
import Learn_derivatives from "@/assets/Icons/Icons/SVG/learn_derivatives.svg";
import Learn_integrals from "@/assets/Icons/Icons/SVG/learn_integrals.svg";

// ---- Tipos ----
interface TopicContent {
  title: string;
  description: string;
  theory?: string[];
  formulas?: string[];
  examples?: {
    problem: string;
    steps: string[];
    solution: string;
  }[];
  tips?: string[];
}

interface Topic {
  id: string;
  name: string;
}

interface Difficulty {
  id: string;
  name: string;
  color: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
  };
}

// ---- Datos ----
type Category =
  | "limites"
  | "derivadas"
  | "vectores"
  | "matrices"
  | "integrales";

const categories: { id: Category; name: string }[] = [
  { id: "matrices", name: "Matrices" },
  { id: "vectores", name: "Vectores" },
  { id: "limites", name: "Límites" },
  { id: "derivadas", name: "Derivadas" },
  { id: "integrales", name: "Integrales" },
];

const topics: Record<Category, Topic[]> = {
  matrices: [
    { id: "matrices_fundamentos", name: "Fundamentos sobre matrices" },
    {
      id: "matrices_operaciones_basicas",
      name: "Matrices Operaciones Basicas",
    },
    {
      id: "matrices_operaciones_avanzadas",
      name: "Matrices Operaciones Avanzadas",
    },
    { id: "matrices_aplicaciones", name: "Aplicaciones de Matrices" },
  ],
  vectores: [
    { id: "vectores_introduccion", name: "Fundamentos sobre vectores" },
    {
      id: "vectores_operaciones",
      name: "Vectores Operaciones ",
    },
    {
      id: "vectores_aplicaciones",
      name: "Vectores Aplicaciones",
    },
    { id: "vectores_espacios", name: "Vectores en Espacios" },
  ],
  limites: [
    { id: "limites_introduccion", name: "Límites Introduccion" },
    { id: "limites_calculos", name: "Límites Calculos" },
    { id: "limites_continuidad", name: "Límites continuidad" },
    {
      id: "limites_aplicaciones",
      name: "Aplicaciones de Limites",
    },
  ],
  derivadas: [
    {
      id: "derivadas_fundamentos",
      name: "Fundamentos de derivadas",
    },
    {
      id: "derivadas_regla_de_derivacion",
      name: "Derivadas Regla de Derivacion",
    },
    {
      id: "derivadas_funciones",
      name: "Derivadas funciones especiales",
    },
    {
      id: "derivadas_aplicaciones",
      name: "Apliaciones de Derivadas",
    },
  ],
  integrales: [
    { id: "integrales_indefinidas", name: "Integrales indefinidas" },
    { id: "integrales_tecnicas", name: "Integrales Tecnicas" },
    { id: "integrales_definidas", name: "Integrales definidas" },
    { id: "integrales_aplicaciones", name: "Aplicaciones de integrales" },
  ],
};

const difficulties: Difficulty[] = [
  {
    id: "facil",
    name: "Fácil",
    color: {
      backgroundColor: "#d1fbd1",
      borderColor: "#10b981",
      textColor: "#10b981",
    },
  },
  {
    id: "medio",
    name: "Medio",
    color: {
      backgroundColor: "#fef9c3",
      borderColor: "#fef08a",
      textColor: "#f59e0b",
    },
  },
  {
    id: "dificil",
    name: "Difícil",
    color: {
      backgroundColor: "#fee2e2",
      borderColor: "#ef4444",
      textColor: "#ef4444",
    },
  },
];

const typedTopicData = topicData as Record<string, TopicContent>;

// ---- Componente LearningPage ----
function LearningPage() {
  // Ref del ScrollView principal
  const scrollViewRef = useRef<ScrollView | null>(null);
  // Objeto para almacenar refs de cada sección (en este caso, las categorías)
  const sectionRefs = useRef<Record<string, any>>({});
  // Se obtiene el parámetro 'topic' de la URL (por ejemplo, "derivadas")
  const { topic } = useGlobalSearchParams();

  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [activeSections, setActiveSections] = useState<number[]>([]);

  //Primero se accede al topic
  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setSelectedDifficulty("");
  };

  //Luego se agrega la dificultad
  const handleDifficultySelect = (difficultyId: string) => {
    setSelectedDifficulty(difficultyId);
  };
  //Buscar el ejercicio de ejemplo
  const getTopicContent = (): TopicContent | null => {
    if (!selectedTopic || !selectedDifficulty) return null;
    const topicKey = `${selectedTopic}_${selectedDifficulty}`;
    return typedTopicData[topicKey] || null;
  };
  const topicContent = getTopicContent();

  const handleNextTopic = () => {
    // Se crea una lista plana de todos los temas (siguiendo el orden de las categorías)
    const allTopics = categories.reduce<Topic[]>((acc, cat) => {
      return acc.concat(topics[cat.id]);
    }, []);
    const currentIndex = allTopics.findIndex(
      (topic) => topic.id === selectedTopic
    );
    if (currentIndex !== -1 && currentIndex < allTopics.length - 1) {
      const nextTopic = allTopics[currentIndex + 1];
      setSelectedTopic(nextTopic.id);
      setSelectedDifficulty("");
      setActiveSections([]);
    } else {
      // Si ya no hay siguiente tema, se reinicia la selección
      setSelectedTopic("");
      setSelectedDifficulty("");
      setActiveSections([]);
    }
  };

  // Efecto para desplazarse a la sección indicada en el parámetro "topic"
  useEffect(() => {
    const topicParam = topic as string;
    if (
      topicParam &&
      scrollViewRef.current &&
      sectionRefs.current[topicParam]
    ) {
      const scrollViewNode = findNodeHandle(scrollViewRef.current);
      sectionRefs.current[topicParam].measureLayout(
        scrollViewNode,
        (x: number, y: number) => {
          scrollViewRef.current?.scrollTo({ x: 0, y, animated: true });
        },
        (error: any) => console.error("Error midiendo el layout:", error)
      );
    }
  }, [topic]);

  const renderContent = () => {
    if (!selectedTopic) {
      // Mostrar la lista de temas agrupados por categoría.
      // Se asigna la ref a cada contenedor de categoría para permitir el scroll
      return (
        <View style={styles.topicList}>
          {categories.map((cat) => (
            <View key={cat.id} ref={(el) => (sectionRefs.current[cat.id] = el)}>
              <Text style={styles.categoryHeader}>{cat.name}</Text>
              {topics[cat.id].map((topic) => (
                <LessonCard
                  key={topic.id}
                  title={topic.name}
                  onPress={() => handleTopicSelect(topic.id)}
                  Icon={selectedTopicIcon(topic.id) || Learn_matrices}
                />
              ))}
            </View>
          ))}
        </View>
      );
    } else if (!selectedDifficulty) {
      return (
        <View style={styles.difficultySelection}>
          <Pressable
            onPress={() => setSelectedTopic("")}
            style={styles.backButton}
          >
            <ChevronLeft size={16} color="black" />
            <Text style={styles.backButtonText}>Volver a temas</Text>
          </Pressable>
          <Text style={styles.topicTitle}>
            {categories
              .flatMap((cat) => topics[cat.id])
              .find((t) => t.id === selectedTopic)?.name || ""}
          </Text>
          <View style={styles.difficultiesGrid}>
            {difficulties.map((difficulty) => (
              <TouchableOpacity
                key={difficulty.id}
                style={styles.difficultyCard}
                onPress={() => handleDifficultySelect(difficulty.id)}
              >
                <View>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor:
                        difficulty.id === "facil"
                          ? "#BAE639"
                          : difficulty.id === "medio"
                            ? "#yellow"
                            : "red",
                    }}
                  ></View>
                </View>
                <View style={{ marginLeft: 16 }}>
                  <Text style={[styles.badge]}>{difficulty.name}</Text>
                  <Text style={styles.difficultyDescription}>
                    {difficulty.id === "facil" &&
                      "Conceptos básicos y ejemplos sencillos"}
                    {difficulty.id === "medio" &&
                      "Aplicaciones y problemas intermedios"}
                    {difficulty.id === "dificil" &&
                      "Problemas avanzados y casos especiales"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.topicContentContainer}>
          <View style={styles.backTopicDifficultyContainer}>
            <Pressable
              onPress={() => setSelectedDifficulty("")}
              style={styles.backButton}
            >
              <ChevronLeft size={16} color="black" />
              <Text style={styles.backButtonText}>Volver</Text>
            </Pressable>
            <View style={styles.selectedDifficultyBadges}>
              {difficulties.map((difficulty) => (
                <Pressable
                  key={difficulty.id}
                  onPress={() => handleDifficultySelect(difficulty.id)}
                >
                  <Text
                    style={[
                      styles.badge,
                      {
                        backgroundColor:
                          selectedDifficulty === difficulty.id
                            ? difficulty.color.backgroundColor
                            : "#e5e7eb",
                      },
                    ]}
                  >
                    {difficulty.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <LearningExamples
            topicContent={topicContent}
            activeSections={activeSections}
            setActiveSections={setActiveSections}
            handleNextTopic={handleNextTopic}
          />
        </View>
      );
    }
  };

  return (
    // Se asigna la ref al ScrollView principal
    <ScrollViewReload ref={scrollViewRef} style={styles.container}>
      {renderContent()}
    </ScrollViewReload>
  );
}
function selectedTopicIcon(topicId: string) {
  if (topicId.includes("matrices")) {
    return Learn_matrices;
  } else if (topicId.includes("vectores")) {
    return Learn_vectors;
  } else if (topicId.includes("limites")) {
    return Learn_limits;
  } else if (topicId.includes("derivadas")) {
    return Learn_derivatives;
  } else if (topicId.includes("integrales")) {
    return Learn_integrals;
  }
  return null; // Retorna null si no se encuentra el ícono correspondiente
}

interface TopicContent {
  title: string;
  description: string;
  theory?: string[];
  formulas?: string[];
  examples?: {
    problem: string;
    steps: string[];
    solution: string;
  }[];
  tips?: string[];
}

interface LearningExamplesProps {
  topicContent: TopicContent | null;
  activeSections: number[];
  setActiveSections: (sections: number[]) => void;
  handleNextTopic: () => void;
  ShowFinishButton?: boolean;
  allContent?: boolean;
}

export function LearningExamples({
  topicContent,
  activeSections,
  setActiveSections,
  handleNextTopic,
  ShowFinishButton = true,
  allContent = true,
}: LearningExamplesProps) {
  const router = useRouter();

  return (
    <View>
      {topicContent ? (
        <ScrollView style={styles.topicDetails}>
          <View style={styles.topicHeader}>
            <Text style={styles.topicDetailsTitle}>{topicContent.title}</Text>
            <Text style={styles.topicDetailsDescription}>
              {topicContent.description}
            </Text>
          </View>
          {allContent && topicContent.theory && (
            <View style={styles.theoryContainer}>
              <View style={styles.theoryHeader}>
                <Book size={20} color="#2563eb" />
                <Text style={styles.theoryTitle}>Teoría</Text>
              </View>
              <View style={styles.theoryContent}>
                {topicContent.theory.map((item, index) => (
                  <Text key={index} style={styles.theoryText}>
                    {item}
                  </Text>
                ))}
              </View>
            </View>
          )}
          {topicContent.formulas && (
            <View style={styles.formulasContainer}>
              <View style={styles.formulasHeader}>
                <Lightbulb size={20} color="#6b21a8" />
                <Text style={styles.formulasTitle}>Fórmulas Clave</Text>
              </View>
              <View style={styles.formulasContent}>
                {topicContent.formulas.map((formula, index) => (
                  <View key={index} style={styles.formulaBox}>
                    <MathFormula formula={formula} />
                  </View>
                ))}
              </View>
            </View>
          )}
          {topicContent.examples && (
            <View style={styles.examplesContainer}>
              <Text style={styles.examplesTitle}>Ejemplos</Text>
              <Accordion
                sections={topicContent.examples}
                activeSections={activeSections}
                renderHeader={(section, index) => (
                  <View style={styles.accordionHeader}>
                    <Text style={styles.exampleBadge}>Ejemplo {index + 1}</Text>
                    <Text style={styles.exampleProblem}>
                      <MathFormula formula={section.problem} />
                    </Text>
                  </View>
                )}
                renderContent={(section) => (
                  <View style={styles.accordionContent}>
                    {section.steps.map((step, stepIndex) => (
                      <View key={stepIndex} style={styles.exampleStep}>
                        <View style={styles.exampleStepIcon}>
                          <ArrowRight
                            size={20}
                            color="#FF981C"
                            style={styles.icon}
                          />
                        </View>
                        <View style={styles.exampleStepContent}>
                          <MathFormula formula={step} />
                        </View>
                      </View>
                    ))}
                    <View style={styles.exampleResultContainer}>
                      <Text style={styles.exampleResultLabel}>Resultado:</Text>
                      <View style={styles.exampleResultBox}>
                        <Text style={styles.exampleResultText}>
                          <MathFormula formula={section.solution} />
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                onChange={(active) => setActiveSections(active)}
                underlayColor="#f1f1f1"
              />
            </View>
          )}
          {allContent && topicContent.tips && (
            <View style={styles.tipsContainer}>
              <View style={styles.tipsHeader}>
                <Lightbulb size={20} color="#d97706" />
                <Text style={styles.tipsTitle}>Consejos y Trucos</Text>
              </View>
              <View style={styles.tipsList}>
                {topicContent.tips.map((tip, index) => (
                  <Text key={index} style={styles.tipItem}>
                    • {tip}
                  </Text>
                ))}
              </View>
            </View>
          )}
          {ShowFinishButton && (
            <View style={styles.topicActions}>
              <Pressable
                style={styles.actionButton}
                onPress={() => router.push("/")}
              >
                <Text>Practicar Ejercicios</Text>
              </Pressable>
              <Pressable
                style={[styles.actionButton, styles.nextTopicButton]}
                onPress={handleNextTopic}
              >
                <Text style={{ color: "white" }}>Siguiente Tema</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.noContent}>
          <Text style={styles.noContentText}>Contenido no disponible</Text>
        </View>
      )}
    </View>
  );
}

export default LearningPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2EAE1" },
  topicList: {
    padding: 16,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  difficultySelection: { padding: 16 },
  backButton: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 12,
  },
  backButtonText: { fontSize: 14, marginLeft: 4, backgroundColor: "white" },
  topicTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 16 },
  difficultiesGrid: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  difficultyCard: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#5F2641",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 16,
  },
  difficultyDescription: { marginTop: 8, fontSize: 12, color: "#6b7280" },
  backTopicDifficultyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  selectedDifficultyBadges: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
  },
  topicContentContainer: { padding: 16 },
  topicDetails: { padding: 16 },
  topicHeader: { marginBottom: 16 },
  topicDetailsTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  topicDetailsDescription: { fontSize: 16, color: "#374151" },
  theoryContainer: {
    backgroundColor: "#eff6ff",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    marginBottom: 16,
  },
  theoryHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  theoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1d4ed8",
    marginLeft: 8,
  },
  theoryContent: { marginBottom: 8 },
  theoryText: { fontSize: 16, color: "#1e40af" },
  formulasContainer: {
    backgroundColor: "#f3e8ff",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd6fe",
    marginBottom: 16,
  },
  formulasHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  formulasTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6d28d9",
    marginLeft: 8,
  },
  formulasContent: { marginBottom: 8 },
  formulaBox: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd6fe",
    marginBottom: 8,
    width: "100%",
    fontSize: 10,
    flexWrap: "wrap",
  },
  examplesContainer: { marginBottom: 16 },
  examplesTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  accordionHeader: {
    flexDirection: "column",
    alignItems: "center",
    padding: 12,
  },
  accordionContent: { padding: 12 },
  exampleBadge: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#ffe4e6",
    color: "#FF981C",
    fontSize: 12,
  },
  exampleProblem: { fontFamily: "monospace", fontSize: 14 },
  exampleStep: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  exampleStepIcon: { marginRight: 8 },
  icon: { marginRight: 4 },
  exampleStepContent: {
    fontSize: 10,
    flexWrap: "wrap",

    width: "100%",
  },
  exampleResultContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  exampleResultLabel: { fontSize: 16, fontWeight: "500", color: "#374151" },
  exampleResultBox: {
    backgroundColor: "#d1fae5",
    padding: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  exampleResultText: { fontFamily: "monospace", fontSize: 14 },
  tipsContainer: {
    backgroundColor: "#ffedd5",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fed7aa",
    marginBottom: 16,
  },
  tipsHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#d97706",
    marginLeft: 8,
  },
  tipsList: { marginLeft: 16 },
  tipItem: { fontSize: 14, color: "#b45309" },
  topicActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  actionButton: { padding: 12, borderRadius: 4 },
  nextTopicButton: { backgroundColor: "#FF981C" },
  noContent: { alignItems: "center", paddingVertical: 32 },
  noContentText: { fontSize: 16, color: "#6b7280" },
});
