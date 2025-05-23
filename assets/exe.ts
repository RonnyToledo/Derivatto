import { dataMap } from "./allExcersices";
// Definición del tipo Category
// ---------------------
interface Category {
  id: number;
  title: string;
  color: string;
  ej: Record<string, any[]>;
}
// Paleta con 10 colores bastante diferentes entre sí
const palette = [
  "#ff694e", // MediumSeaGreen
  "#bae639", // CornflowerBlue
  "#d9a66c", // Gold
  "#bf7315", // Orchid
  "#993d68", // IndianRed
];

// ---------------------
// Funciones auxiliares
// ---------------------

// Mezcla aleatoriamente un array (algoritmo Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// Extrae un subconjunto aleatorio de 'count' elementos.
function getRandomSubset<T>(array: T[], count: number): T[] {
  return shuffleArray(array).slice(0, count);
}

// ---------------------
// Configuración de niveles
// ---------------------

// Cada nivel define cuántos ejercicios de cada dificultad se seleccionan.
interface LevelDistribution {
  easy: number;
  medium: number;
  hard: number;
}

const levelDistributions: LevelDistribution[] = [
  { easy: 10, medium: 5, hard: 0 },
  { easy: 5, medium: 5, hard: 5 },
  { easy: 0, medium: 5, hard: 10 },
];

// Genera niveles para un tipo específico (ejemplo: "derivadas_regla_cadena") usando la configuración de niveles.
function generateLevelsForType(
  typePrefix: string,
  distributions: LevelDistribution[]
): any[][] {
  const poolEasy = dataMap[`${typePrefix}_facil`] || [];
  const poolMedium = dataMap[`${typePrefix}_media`] || [];
  const poolDifficult = dataMap[`${typePrefix}_dificil`] || [];

  return distributions.map((distribution) => {
    const selectedEasy = getRandomSubset(poolEasy, distribution.easy);
    const selectedMedium = getRandomSubset(poolMedium, distribution.medium);
    const selectedDifficult = getRandomSubset(poolDifficult, distribution.hard);
    // Combina y mezcla para que no aparezcan agrupados por dificultad.
    const levelExercises = [
      ...selectedEasy,
      ...selectedMedium,
      ...selectedDifficult,
    ];

    return levelExercises;
  });
}

// Función para transformar una categoría generando nuevos patrones numerados basándose en el sufijo de dificultad.
function formatParentCategory(parent: Category): Category {
  // Extrae los nombres base de los patrones eliminando el sufijo (_facil, _media, _dificil)
  const patterns = new Set(
    Object.keys(parent.ej).map((key) =>
      key.replace(/_(facil|media|dificil)$/, "")
    )
  );
  const newEj: Record<string, any[]> = {};

  // Para cada patrón base, genera niveles y asigna a una nueva clave.
  patterns.forEach((pattern) => {
    const niveles = generateLevelsForType(pattern, levelDistributions);
    niveles.forEach((nivel, index) => {
      newEj[`${pattern}-${index + 1}`] = nivel;
    });
  });

  return {
    id: parent.id,
    title: parent.title,
    color: parent.color,
    ej: newEj,
  };
}

// ---------------------
// Agrupación según el prefijo
// ---------------------
// Definimos los grupos a partir de las primeras palabras de las keys.
const tipos = ["Matrices", "Vectores", "Limites", "Derivadas", "Integrales"];

const groupedCategories: Category[] = tipos.map((tipo, index) => {
  const prefix = tipo.toLowerCase(); // Se comparan en minúsculas

  const ejerciciosGrupo = Object.keys(dataMap)
    .filter((key) => key.startsWith(prefix))
    .reduce(
      (acc, key) => {
        acc[key] = dataMap[key];
        return acc;
      },
      {} as Record<string, any[]>
    );

  // Se asigna un color único basado en el nombre del grupo.
  const color = palette[index];

  return {
    id: index,
    title: tipo,
    color,
    ej: ejerciciosGrupo,
  };
});

// ---------------------
// Salida final
// ---------------------
// Se aplica la función de formateo a cada categoría agrupada.
export const ejercicioFinish: Category[] =
  groupedCategories.map(formatParentCategory);
