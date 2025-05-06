// getLevelInfo.ts
import { POINTS_PER_LEVEL } from "@/constants/levels";
import { levels } from "./levels";

export interface LevelInfo {
  currentLevel: number;
  nextLevelScore: number;
}

/**
 * Dada una puntuación total, devuelve el nivel actual y
 * la puntuación necesaria para alcanzar el siguiente nivel.
 *
 * @param score - Puntos acumulados por el usuario (>= 0)
 * @returns { currentLevel, nextLevelScore }
 */
export function getLevelInfo(score: number): LevelInfo {
  if (score < 0) {
    throw new Error("La puntuación no puede ser negativa");
  }

  // Calcula el nivel actual (completado)
  // p.ej. score=0..44  => floor/45 = 0  => +1 = nivel 1
  //      score=45..89 => floor/45 = 1  => +1 = nivel 2
  const rawLevel = Math.floor(score / POINTS_PER_LEVEL) + 1;

  // Máximo nivel disponible según nuestro array
  const maxDefinedLevel = levels.length;

  // Si supera el último nivel, lo dejamos en el tope
  const currentLevel = Math.min(rawLevel, maxDefinedLevel);

  // Puntos necesarios para completar el nivel actual
  const nextLevelScore = currentLevel * POINTS_PER_LEVEL;

  return { currentLevel, nextLevelScore };
}
