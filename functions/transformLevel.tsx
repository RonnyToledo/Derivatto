export function transformLevel(text: string): string {
  // Separamos la cadena por el guión
  const [rawLevelName, rawThemeCount] = text.split("-");
  // Convertimos la cantidad de temas a número
  const themeCount = parseInt(rawThemeCount, 10);

  // Formateamos el nombre: reemplazamos '_' por espacios y capitalizamos cada palabra
  const formattedLevelName = rawLevelName
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Función auxiliar para generar el sufijo ordinal en español
  function getOrdinal(n: number): string {
    if (n === 1) return "1er";
    if (n === 2) return "2do";
    if (n === 3) return "3er";
    // Para números mayores, se puede ajustar según reglas, aquí se usa "to" de forma genérica
    return `${n}to`;
  }

  // Generamos el array de temas
  let themesString = "";

  for (let i = 1; i <= themeCount; i++) {
    themesString = `${getOrdinal(i)} Tema`;
  }

  return `${formattedLevelName} ${themesString}`;
}
