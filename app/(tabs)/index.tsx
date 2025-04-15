import React from "react";
import { StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import StickyRender from "@/components/HomeComponents/StickyRender";
import SectionListComp from "@/components/HomeComponents/SectionListComp";

export default function Index() {
  const router = useRouter();
  if (Platform.OS === "web") {
    return <StickyRender detectPorCent={detectPorCent} />;
  } else {
    return <SectionListComp detectPorCent={detectPorCent} />;
  }
}

/**
 * Calcula el desplazamiento horizontal según el índice y total de elementos.
 */
function detectPorCent(
  index: number,
  totalItems: number,
  maxTranslate = 100
): number {
  const groupSize = 6;
  const remainder = totalItems % groupSize;
  let value: number;

  // Se determina si el elemento está en la mitad izquierda o derecha.
  const leftHalfCount = Math.abs(index % (groupSize * 2));
  const isLeft = Math.floor(leftHalfCount / groupSize) === 0;

  if (remainder !== 0 && index >= totalItems - remainder) {
    const distribution = getIncompleteGroupDistribution(totalItems % groupSize);
    value = maxTranslate * distribution[index % groupSize];
  } else {
    // Caso en el que se pueda realizar la curva completa
    const distribution = getIncompleteGroupDistribution(7);
    value = maxTranslate * distribution[index % groupSize];
  }
  return isLeft ? value : -value;
}

/**
 * Distribución de valores para grupos incompletos.
 */
function getIncompleteGroupDistribution(groupLength: number): number[] {
  switch (groupLength) {
    case 0:
      return [0];
    case 1:
      return [0];
    case 2:
      return [0, 0];
    case 3:
      return [0, 0.35, 0];
    case 4:
      return [0, 0.35, 0.35, 0];
    case 5:
      return [0, 0.35, 0.75, 0.35, 0];
    case 6:
      return [0, 0.35, 0.75, 0.75, 0.35, 0];
    case 7:
      return [0, 0.35, 0.75, 1, 0.75, 0.35, 0];
    default:
      throw new Error("El grupo incompleto debe tener entre 1 y 5 elementos.");
  }
}
