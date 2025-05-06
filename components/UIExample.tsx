import { ScrollView } from "react-native";
import React, { useState } from "react";
import { topicData } from "@/libs/learning-data";
import { LearningExamples } from "@/app/(tabs)/learning";

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

const typedTopicData = topicData as Record<string, TopicContent>;

const getTopicContent = (
  selectedTopic: string,
  selectedDifficulty: string
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
