// levels.ts
import { POINTS_PER_LEVEL, MAX_TOTAL_POINTS } from "@/constants/levels";

export interface Level {
  level: number;
  maxScore: number; // puntos necesarios para completar este nivel
}

/**
 * Array con todos los niveles hasta cubrir MAX_TOTAL_POINTS.
 * Cada elemento indica el nivel y los puntos acumulados necesarios
 * para completarlo.
 */
export const levels: Level[] = Array.from(
  { length: Math.ceil(MAX_TOTAL_POINTS / POINTS_PER_LEVEL) },
  (_, i) => ({
    level: i + 1,
    maxScore: (i + 1) * POINTS_PER_LEVEL,
  })
);
