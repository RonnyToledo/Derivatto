import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { topicData } from "@/lib/learning-data";
import { LearningExamples } from "@/app/(tabs)/learning";

type Category = "limites" | "derivadas";

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

const categories: { id: Category; name: string }[] = [
  { id: "limites", name: "Límites" },
  { id: "derivadas", name: "Derivadas" },
];
interface Topic {
  id: string;
  name: string;
}

const topics: Record<Category, Topic[]> = {
  limites: [
    { id: "limites_al_infinito", name: "Límites al infinito" },
    { id: "limites_factorizables", name: "Límites factorizables" },
    { id: "limites_infinitos", name: "Límites infinitos" },
    {
      id: "limites_sustitucion_directa",
      name: "Límites por sustitución directa",
    },
  ],
  derivadas: [
    {
      id: "derivadas_de_trigonometricas",
      name: "Derivadas de funciones trigonométricas",
    },
    {
      id: "derivadas_mult_y_div",
      name: "Derivadas de multiplicación y división",
    },
    { id: "derivadas_regla_cadena", name: "Derivadas con regla de la cadena" },
    {
      id: "derivadas_de_exponenciales",
      name: "Derivadas de funciones exponenciales",
    },
    { id: "derivadas_de_inversas", name: "Derivadas de funciones inversas" },
    { id: "derivadas_de_polinomios", name: "Derivadas de polinomios" },
    { id: "derivadas_de_radicales", name: "Derivadas de radicales" },
  ],
};
const typedTopicData = topicData as Record<string, TopicContent>;

const getTopicContent = (
  selectedTopic: String,
  selectedDifficulty: String
): TopicContent | null => {
  if (!selectedTopic || !selectedDifficulty) return null;
  const topicKey = `${selectedTopic}_${selectedDifficulty}`;
  return typedTopicData[topicKey] || null;
};

export default function UIExample({
  topic,
  difficulty,
  onClick,
  allContent,
}: {
  topic: string;
  difficulty: string;
  onClick: () => void;
  allContent: boolean;
}) {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const selectedTopic = topic;
  const selectedDifficulty = difficulty;
  const topicContent = getTopicContent(selectedTopic, selectedDifficulty);

  if (!topicContent) return null;

  return (
    <ScrollView>
      <LearningExamples
        topicContent={topicContent}
        activeSections={activeSections}
        setActiveSections={setActiveSections}
        handleNextTopic={onClick}
        ShowFinishButton={false}
        allContent={allContent}
      />
    </ScrollView>
  );
}
