import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Check, X } from "lucide-react-native";
import MathFormula from "./math-formula";

interface ExerciseOptionProps {
  option: string;
  index: number;
  selected: boolean;
  correct?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function ExerciseOption({
  option,
  index,
  selected,
  correct,
  onClick,
  disabled,
}: ExerciseOptionProps) {
  // Determinar el estilo condicional
  let conditionalStyle;
  if (selected) {
    if (correct === undefined) {
      conditionalStyle = styles.selectedDefault;
    } else if (correct) {
      conditionalStyle = styles.selectedCorrect;
    } else {
      conditionalStyle = styles.selectedIncorrect;
    }
  } else if (correct === true) {
    conditionalStyle = styles.notSelectedCorrect;
  } else {
    conditionalStyle = styles.defaultState;
  }

  // Combinar estilos usando spread operator
  const containerStyles = {
    ...styles.container,
    ...conditionalStyle,
    ...(disabled && { opacity: 0.8 }),
  };
  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={disabled ? undefined : onClick}
      activeOpacity={0.8}
    >
      <View style={styles.letterContainer}>
        <Text style={styles.letterText}>{index + 1}</Text>
      </View>
      <View style={styles.optionContent}>
        <MathFormula formula={option} />
      </View>

      {selected && correct === true && (
        <View style={[styles.feedbackIcon, styles.correctIcon]}>
          <Check size={16} color="white" />
        </View>
      )}

      {selected && correct === false && (
        <View style={[styles.feedbackIcon, styles.incorrectIcon]}>
          <X size={16} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
}

// Los estilos se mantienen igual
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 4,
    width: "100%",
  },
  defaultState: {
    backgroundColor: "white",
    borderColor: "#e5e7eb",
  },
  selectedDefault: {
    backgroundColor: "#ffe4e6",
    borderColor: "#f9a8d4",
  },
  selectedCorrect: {
    backgroundColor: "#d1fae5",
    borderColor: "#10b981",
  },
  selectedIncorrect: {
    backgroundColor: "#fee2e2",
    borderColor: "#ef4444",
  },
  notSelectedCorrect: {
    backgroundColor: "#d1fae5",
    borderColor: "#10b981",
  },
  letterContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e7e7e7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  letterText: {
    fontSize: 16,
    fontWeight: "700",
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    fontFamily: "monospace",
    fontSize: 14,
  },
  feedbackIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  correctIcon: {
    backgroundColor: "#10b981",
  },
  incorrectIcon: {
    backgroundColor: "#ef4444",
  },
});
