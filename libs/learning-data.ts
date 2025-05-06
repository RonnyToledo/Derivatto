export const topicData = {
  // MATRICES

  matrices_fundamentos_facil: {
    title: "Fundamentos de Matrices - Nivel Básico",
    description:
      "Introducción a las matrices: definición, elementos (filas, columnas y orden).",
    theory: [
      "Una matriz es un conjunto de números organizados en filas y columnas.",
      "El orden de una matriz se expresa como el número de filas x el número de columnas.",
    ],
    examples: [
      {
        problem: "Determina el orden de la matriz: [[2, 4], [6, 8]]",
        steps: [
          "Cuenta las filas: la matriz tiene 2 filas.",
          "Cada fila tiene 2 elementos, lo que indica 2 columnas.",
          "Por lo tanto, el orden es 2x2.",
        ],
        solution: "2x2",
      },
      {
        problem:
          "Determina el orden de la matriz: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        steps: [
          "Cuenta las filas: se observan 3 filas.",
          "Cada fila contiene 3 elementos, lo que significa 3 columnas.",
          "El orden de la matriz es 3x3.",
        ],
        solution: "3x3",
      },
    ],
    tips: [
      "Verifica siempre el número de filas y columnas.",
      "El orden se expresa como filas x columnas.",
    ],
  },

  // Nivel Intermedio: Identificación de tipos de matrices
  matrices_fundamentos_medio: {
    title: "Fundamentos de Matrices - Nivel Intermedio",
    description:
      "Exploración de los tipos de matrices: cuadrada, diagonal, identidad, triangular y nula.",
    theory: [
      "Una matriz cuadrada tiene el mismo número de filas y columnas.",
      "Las matrices diagonal, identidad, triangular y nula presentan propiedades especiales en sus elementos.",
    ],
    examples: [
      {
        problem: "Analiza la matriz: [[1, 0], [0, 1]] y clasifícala.",
        steps: [
          "Observa que la matriz es cuadrada (2x2).",
          "Los elementos de la diagonal principal son 1 y los demás son 0.",
          "Esta configuración define una matriz identidad.",
        ],
        solution: "Matriz cuadrada e identidad, orden 2x2",
      },
      {
        problem: "Determina el tipo de la matriz: [[0, 2], [3, 0]].",
        steps: [
          "La matriz es cuadrada (2x2) por tener el mismo número de filas y columnas.",
          "No cumple las condiciones para ser diagonal (sólo la diagonal tiene valores distintos de 0) ni identidad (diagonal de 1).",
          "Tampoco es nula, ya que tiene elementos distintos de 0.",
        ],
        solution: "Matriz cuadrada, no diagonal, ni identidad, ni nula",
      },
    ],
    tips: [
      "Compara los valores de la diagonal principal con el resto de los elementos.",
      "Identifica características únicas para cada tipo de matriz.",
    ],
  },

  // Nivel Avanzado: Matriz transpuesta y simetría
  matrices_fundamentos_dificil: {
    title: "Fundamentos de Matrices - Nivel Avanzado",
    description:
      "Análisis avanzado: cálculo de la matriz transpuesta y verificación de simetría.",
    theory: [
      "La transpuesta de una matriz se obtiene intercambiando filas por columnas.",
      "Una matriz es simétrica si es igual a su transpuesta.",
    ],
    examples: [
      {
        problem:
          "Calcula la transpuesta y verifica si la matriz es simétrica: [[1, 2, 3], [2, 4, 5], [3, 5, 6]]",
        steps: [
          "Intercambia filas por columnas para obtener la transpuesta.",
          "La matriz transpuesta es: [[1, 2, 3], [2, 4, 5], [3, 5, 6]].",
          "Como la matriz original es igual a su transpuesta, se clasifica como simétrica.",
        ],
        solution:
          "Matriz transpuesta: [[1,2,3],[2,4,5],[3,5,6]]; La matriz es simétrica",
      },
      {
        problem: "Determina la transpuesta de la matriz: [[7, 8], [9, 10]]",
        steps: [
          "Intercambia los elementos de filas por columnas.",
          "La matriz transpuesta es: [[7, 9], [8, 10]].",
        ],
        solution: "Matriz transpuesta: [[7,9],[8,10]]",
      },
    ],
    tips: [
      "Para calcular la transpuesta, intercambia el elemento en la posición (i, j) por el de la posición (j, i).",
      "Una matriz simétrica es aquella que resulta igual a su transpuesta.",
    ],
  },

  matrices_operaciones_basicas_facil: {
    title: "Operaciones Básicas: Suma y Resta de Matrices",
    description:
      "Reglas y ejemplos prácticos para sumar y restar matrices, donde ambas deben tener el mismo orden.",
    theory: [
      "Para sumar o restar matrices, estas deben tener el mismo número de filas y columnas.",
      "La operación se realiza de forma elemento a elemento.",
    ],
    examples: [
      {
        problem: " [[1, 2], [3, 4]] + [[5, 6], [7, 8]] ",
        steps: [
          "Suma cada elemento correspondiente: (1+5), (2+6), (3+7) y (4+8).",
          "Se obtiene una nueva matriz donde cada posición es la suma de los elementos originales.",
        ],
        solution: " [[6, 8], [10, 12]] ",
      },
      {
        problem: " [[9, 8], [7, 6]] - [[1, 2], [3, 4]] ",
        steps: [
          "Resta los elementos correspondientes: (9-1), (8-2), (7-3) y (6-4).",
          "El resultado es una matriz formada por las diferencias obtenidas en cada posición.",
        ],
        solution: " [[8, 6], [4, 2]] ",
      },
    ],
    tips: [
      "Verifica que ambas matrices tengan el mismo orden antes de operar.",
      "Realiza la operación elemento a elemento para evitar errores.",
    ],
  },

  // OPERACIONES BÁSICAS: MULTIPLICACIÓN POR ESCALAR
  matrices_operaciones_basicas_medio: {
    title: "Operaciones Básicas: Multiplicación por Escalar",
    description:
      "Aplicación práctica de la multiplicación de una matriz por un escalar, afectando a cada uno de sus elementos.",
    theory: [
      "Multiplicar una matriz por un escalar significa multiplicar cada uno de sus elementos por ese número.",
      "El resultado es una matriz escalada en la que cada componente se ha ajustado proporcionalmente.",
    ],
    examples: [
      {
        problem: " 3 * [[2, 4], [6, 8]]",
        steps: [
          "Multiplica cada elemento de la matriz por 3: (3*2), (3*4), (3*6) y (3*8).",
          "El resultado es la matriz escalada con cada valor modificado.",
        ],
        solution: " [[6, 12], [18, 24]] ",
      },
      {
        problem: " -2 * [[1, -3], [4, 5]] ",
        steps: [
          "Multiplica cada elemento por -2: (-2*1), (-2*-3), (-2*4) y (-2*5).",
          "El resultado muestra cómo se invierte el signo de algunos elementos al aplicar el escalar negativo.",
        ],
        solution: " [[-2, 6], [-8, -10]] ",
      },
    ],
    tips: [
      "Revisa el signo del escalar para asegurarte de que el resultado es correcto.",
      "Multiplica cada elemento individualmente para evitar errores de cálculo.",
    ],
  },

  // OPERACIONES BÁSICAS: MULTIPLICACIÓN DE MATRICES
  matrices_operaciones_basicas_dificil: {
    title: "Operaciones Básicas: Multiplicación de Matrices",
    description:
      "Aplicación de la regla fila-columna y análisis de la propiedad no conmutativa en la multiplicación de matrices.",
    theory: [
      "Para multiplicar matrices, el número de columnas de la primera debe coincidir con el número de filas de la segunda.",
      "La multiplicación se realiza tomando el producto escalar de las filas de la primera matriz con las columnas de la segunda.",
      "Esta operación no es conmutativa; es decir, A * B ≠ B * A en general.",
    ],
    examples: [
      {
        problem: " [[1, 2], [3, 4]] * [[5, 6], [7, 8]] ",
        steps: [
          "Calcula el primer elemento: (1*5 + 2*7).",
          "Calcula el segundo elemento: (1*6 + 2*8).",
          "Calcula el tercer elemento: (3*5 + 4*7).",
          "Calcula el cuarto elemento: (3*6 + 4*8).",
        ],
        solution: " [[19, 22], [43, 50]] ",
      },
      {
        problem: " [[2, 0], [1, 3]] * [[4, 5], [6, 7]] ",
        steps: [
          "Para la primera fila y primera columna: (2*4 + 0*6).",
          "Primera fila y segunda columna: (2*5 + 0*7).",
          "Segunda fila y primera columna: (1*4 + 3*6).",
          "Segunda fila y segunda columna: (1*5 + 3*7).",
        ],
        solution: " [[8, 10], [22, 26]] ",
      },
    ],
    tips: [
      "Asegúrate de que el número de columnas de la primera matriz coincida con el de filas de la segunda.",
      "Recuerda que el orden de multiplicación es importante, ya que la operación no es conmutativa.",
    ],
  },
  matrices_operaciones_avanzadas_facil: {
    title: "Operaciones Avanzadas en Matrices - Nivel Básico",
    description:
      "Introducción a operaciones avanzadas: cálculo del determinante para matrices 2x2 y obtención de la matriz inversa en casos sencillos.",
    theory: [
      "El determinante de una matriz 2x2 se calcula como: a, b, c, d usando la fórmula: (a*d) - (b*c).",
      "Una matriz es invertible si su determinante es distinto de cero. Para 2x2, la inversa se obtiene aplicando la transformación de elementos y dividiendo por el determinante.",
    ],
    examples: [
      {
        problem: "Calcula el determinante de la matriz: [2, 3], [4, 5]",
        steps: [
          "Identifica los elementos: a = 2, b = 3, c = 4, d = 5.",
          "Aplica la fórmula: (2*5) - (3*4).",
          "Realiza la multiplicación: 10 - 12 = -2.",
        ],
        solution: "Determinante = -2",
      },
      {
        problem:
          "Encuentra la matriz inversa de [1, 2], [3, 4] utilizando Gauss-Jordan.",
        steps: [
          "Verifica que la matriz es invertible: calcula el determinante con (1*4) - (2*3) = 4 - 6 = -2.",
          "Como el determinante no es cero, se procede con Gauss-Jordan.",
          "Se forma la matriz aumentada [matriz | identidad] y se realizan operaciones elementales.",
          "El resultado es la matriz inversa: [-2, 1], [1.5, -0.5].",
        ],
        solution: "Matriz inversa: [[-2, 1], [1.5, -0.5]]",
      },
    ],
    tips: [
      "Verifica siempre que el determinante sea diferente de cero antes de calcular la inversa.",
      "Utiliza los pasos ordenados para aplicar las fórmulas correctamente.",
    ],
  },
  matrices_operaciones_avanzadas_medio: {
    title: "Operaciones Avanzadas en Matrices - Nivel Intermedio",
    description:
      "Profundización en el cálculo de determinantes para matrices 3x3 (usando cofactores) y en la obtención de la matriz inversa para casos de mayor dimensión.",
    theory: [
      "Para matrices 3x3 se puede utilizar el método de Sarrus o la expansión en cofactores. En este ejemplo usaremos la expansión en cofactores.",
      "El método de cofactores consiste en seleccionar una fila (o columna), calcular sus menores y aplicar los signos alternos para obtener el determinante.",
    ],
    examples: [
      {
        problem:
          "Calcula el determinante de la matriz 3x3: [1, 2, 3], [0, 4, 5], [1, 0, 6] utilizando cofactores.",
        steps: [
          "Expande por la primera fila, considerando los elementos 1, 2 y 3.",
          "Para el elemento 1, el menor es la submatriz: [4,5],[0,6].",
          "Para el elemento 2, el menor es: [0,5],[1,6] y para el elemento 3: [0,4],[1,0].",
          "Aplica la fórmula: 1*det([[4,5],[0,6]]) - 2*det([[0,5],[1,6]]) + 3*det([[0,4],[1,0]].",
          "Realiza los cálculos: 1*(4*6-5*0) - 2*(0*6-5*1) + 3*(0*0-4*1) = 24 - (-10) - 12 = 22.",
        ],
        solution: "Determinante = 22",
      },
      {
        problem:
          "Encuentra la matriz inversa de [2, 1, 1], [1, 3, 2], [1, 0, 0] mediante el método de Gauss-Jordan.",
        steps: [
          "Primero, verifica la invertibilidad calculando el determinante.",
          "Forma la matriz aumentada [matriz | identidad].",
          "Realiza las operaciones elementales para transformar la parte izquierda en la matriz identidad.",
          "La parte derecha del resultado corresponde a la matriz inversa.",
        ],
        solution:
          "Matriz inversa obtenida aplicando Gauss-Jordan (resultado numérico específico según los cálculos).",
      },
    ],
    tips: [
      "Revisa cuidadosamente los signos al aplicar la expansión en cofactores.",
      "Asegúrate de llevar un registro claro de las operaciones en el método de Gauss-Jordan.",
    ],
  },
  matrices_operaciones_avanzadas_dificil: {
    title: "Operaciones Avanzadas en Matrices - Nivel Avanzado",
    description:
      "Análisis detallado del cálculo de determinantes en matrices complejas con interpretación geométrica y del método completo de Gauss-Jordan en matrices de mayor tamaño.",
    theory: [
      "El valor absoluto del determinante de una matriz 2x2 representa el área del paralelogramo formado por sus vectores columna; para una matriz 3x3, indica el volumen del paralelepípedo.",
      "El método de Gauss-Jordan se utiliza para encontrar la matriz inversa, garantizando la transformación de la matriz aumentada en la identidad, siempre que el determinante sea distinto de cero (matriz no singular).",
    ],
    examples: [
      {
        problem:
          "Determina el área del paralelogramo formado por los vectores de la matriz: [3, 4], [2, 5].",
        steps: [
          "Calcula el determinante: (3*5) - (4*2) = 15 - 8 = 7.",
          "El área es el valor absoluto del determinante: |7| = 7.",
        ],
        solution: "Área = 7 unidades cuadradas",
      },
      {
        problem:
          "Calcula el determinante de la matriz 3x3: [2, -1, 3], [4, 0, 1], [1, 2, 2] utilizando cofactores y explica su interpretación geométrica.",
        steps: [
          "Selecciona la primera fila para la expansión en cofactores.",
          "Calcula los menores y aplica los signos alternos en cada término.",
          "Obtén el determinante; su valor absoluto representa el volumen del paralelepípedo formado por los vectores columna de la matriz.",
          "Realiza todos los pasos detalladamente para llegar al valor final.",
        ],
        solution:
          "Determinante = (valor calculado); el valor absoluto indica el volumen geométrico.",
      },
      {
        problem:
          "Encuentra la matriz inversa de [4, 7, 2], [3, 6, 1], [2, 5, 1] utilizando el método de Gauss-Jordan y verifica la condición de existencia.",
        steps: [
          "Calcula el determinante para confirmar que la matriz es no singular (≠ 0).",
          "Forma la matriz aumentada [matriz | identidad].",
          "Realiza operaciones elementales hasta obtener la identidad en el lado izquierdo.",
          "La parte derecha del resultado será la matriz inversa.",
          "Confirma que el determinante es distinto de cero, lo que valida la existencia de la inversa.",
        ],
        solution:
          "Matriz inversa obtenida y se confirma la condición de existencia.",
      },
    ],
    tips: [
      "Para problemas avanzados, es crucial detallar cada paso del cálculo, tanto en la expansión en cofactores como en el método de Gauss-Jordan.",
      "Utiliza diagramas o representaciones gráficas para visualizar áreas y volúmenes cuando sea posible.",
      "Verifica sistemáticamente que el determinante sea distinto de cero para garantizar la invertibilidad.",
    ],
  },
  // APLICACIONES DE MATRICES - NIVEL BÁSICO
  matrices_aplicaciones_facil: {
    title: "Aplicaciones de Matrices - Nivel Básico",
    description:
      "Introducción a la representación de sistemas de ecuaciones lineales y la formación de la matriz aumentada.",
    theory: [
      "Un sistema de ecuaciones lineales se puede expresar en forma matricial como //Ax = b, donde A es la matriz de coeficientes, x el vector de incógnitas y b el vector de términos independientes.",
      "La matriz aumentada se forma al unir la matriz A y el vector b para facilitar la resolución del sistema.",
    ],
    examples: [
      {
        problem:
          "Representa en forma matricial el sistema de ecuaciones: x + y = 3 y 2x - y = 0.",
        steps: [
          "Identifica la matriz de coeficientes: [1, 1], [2, -1]]",
          "Define el vector de incógnitas: x, y]",
          "Determina el vector de términos independientes: 3, 0].",
          "Escribe la ecuación matricial: [1, 1], [2, -1]] [x, y] = [3, 0]",
        ],
        solution: "La representación matricial es: //Ax = b",
      },
      {
        problem:
          "Forma la matriz aumentada para el sistema: 3x + 2y = 8 y x - y = 1.",
        steps: [
          "Matriz A: [3, 2], [1, -1]]",
          "Vector b: 8, 1].",
          "La matriz aumentada es: [3, 2, 8], [1, -1, 1]]",
        ],
        solution: "La matriz aumentada es: [3, 2, 8], [1, -1, 1]]",
      },
    ],
    tips: [
      "Verifica que los coeficientes y los términos independientes se identifiquen correctamente.",
      "Utiliza la notación //Ax = b para simplificar la representación del sistema.",
    ],
  },

  // APLICACIONES DE MATRICES - NIVEL INTERMEDIO
  matrices_aplicaciones_medio: {
    title: "Aplicaciones de Matrices - Nivel Intermedio",
    description:
      "Resolución de sistemas de ecuaciones lineales utilizando la representación matricial y el método de la matriz aumentada mediante operaciones elementales.",
    theory: [
      "El método de la matriz aumentada permite aplicar operaciones elementales para eliminar variables y resolver el sistema.",
      "La eliminación de Gauss es una técnica común para triangular la matriz y facilitar la obtención de la solución.",
    ],
    examples: [
      {
        problem:
          "Resuelve el sistema: x + 2y = 5 y 3x - y = 4 utilizando la matriz aumentada.",
        steps: [
          "Forma la matriz aumentada: [1, 2, 5], [3, -1, 4]]",
          "Multiplica la primera fila por 3 y réstala de la segunda para eliminar la variable x de la segunda fila.",
          "Resuelve el sistema resultante para encontrar los valores de x y y.",
        ],
        solution: "La solución es: x = 2 y y = 1.5",
      },
      {
        problem:
          "Representa y resuelve en forma matricial el sistema: 2x + y = 7 y x - 3y = -2.",
        steps: [
          "Identifica A: [2, 1], [1, -3]], x: x, y] y b: 7, -2].",
          "Escribe la ecuación Ax = b.",
          "Forma la matriz aumentada: [2, 1, 7], [1, -3, -2]] y aplica eliminación de Gauss.",
        ],
        solution: "La solución es: x = 2 y y = 3",
      },
    ],
    tips: [
      "Realiza operaciones elementales de fila para simplificar la matriz aumentada.",
      "Verifica la solución sustituyendo los valores en las ecuaciones originales.",
    ],
  },

  // APLICACIONES DE MATRICES - NIVEL AVANZADO
  matrices_aplicaciones_dificil: {
    title: "Aplicaciones de Matrices - Nivel Avanzado",
    description:
      "Resolución de sistemas complejos y aplicación de transformaciones lineales a través de representaciones matriciales avanzadas.",
    theory: [
      "La eliminación de Gauss-Jordan es útil para obtener la forma reducida de la matriz aumentada y resolver sistemas complejos.",
      "Las transformaciones lineales se representan mediante matrices que aplican operaciones geométricas, como rotaciones y escalados, en el espacio.",
    ],
    examples: [
      {
        problem:
          "Resuelve el sistema: 3x + 2y - z = 5, 2x - 2y + 4z = -2 y -x + 0.5y - z = 0 utilizando la matriz aumentada.",
        steps: [
          "Forma la matriz aumentada: [3, 2, -1, 5], [2, -2, 4, -2], [-1, 0.5, -1, 0]]",
          "Aplica eliminación de Gauss-Jordan para transformar la matriz a su forma reducida.",
          "Obtén los valores únicos de x, y y z a partir de la matriz resultante.",
        ],
        solution: "La solución es: x = 1, y = 1 y z = 2",
      },
      {
        problem:
          "Determina la matriz de transformación que rota puntos 90° en sentido antihorario y aplícala a un vector.",
        steps: [
          "La matriz de rotación 90° en el plano es: [0, -1], [1, 0]]",
          "Multiplica esta matriz por el vector a transformar, por ejemplo, x, y]",
          "El resultado es el vector transformado: -y, x], que corresponde a la rotación solicitada.",
        ],
        solution: "El vector transformado es: -y, x]",
      },
    ],
    tips: [
      "En sistemas complejos, verifica la existencia y unicidad de la solución tras aplicar eliminación.",
      "Comprende la geometría de la transformación para validar la matriz de rotación o escalado.",
    ],
  },

  vectores_introduccion_facil: {
    title: "Introducción a Vectores - Nivel Básico",
    description:
      "Definición y representación de vectores en 2D y 3D, identificando componentes, magnitud y dirección.",
    theory: [
      "Un vector es una magnitud que posee dirección y sentido.",
      "En 2D se representa como x, y y en 3D como x, y, z.",
    ],
    examples: [
      {
        problem: "Representa el vector 2, 3 en el plano 2D.",
        steps: [
          "Identifica la componente en x: 2.",
          "Identifica la componente en y: 3.",
          "Dibuja el vector partiendo del origen hasta el punto 2, 3.",
        ],
        solution: "El vector se representa como 2, 3 en el plano 2D.",
      },
      {
        problem: "Representa el vector 4, -1, 5 en el espacio 3D.",
        steps: [
          "Identifica las componentes: x=4, y=-1, z=5.",
          "Ubica el vector en el espacio utilizando las tres coordenadas.",
        ],
        solution: "El vector se representa como 4, -1, 5 en el espacio 3D.",
      },
    ],
    tips: [
      "Recuerda que las componentes del vector determinan su posición en el espacio.",
      "Dibujar el vector partiendo desde el origen ayuda a comprender mejor su dirección y magnitud.",
    ],
  },

  vectores_introduccion_medio: {
    title: "Introducción a Vectores - Nivel Intermedio",
    description:
      "Cálculo de magnitud y dirección en vectores 2D y 3D, e introducción a los vectores unitarios i, j, k.",
    theory: [
      "La magnitud de un vector en 2D a, b se calcula como √(a^2 + b^2).",
      "En 3D, la magnitud de a, b, c se obtiene con √(a^2 + b^2 + c^2).",
      "Los vectores unitarios i, j, k indican las direcciones de los ejes en el espacio.",
    ],
    examples: [
      {
        problem: "Calcula la magnitud del vector 3, 4.",
        steps: [
          "Eleva al cuadrado cada componente: 3^2 = 9 y 4^2 = 16.",
          "Suma los resultados: 9 + 16 = 25.",
          "Aplica la raíz cuadrada: √25 = 5.",
        ],
        solution: "La magnitud del vector es 5.",
      },
      {
        problem: "Explica la función de los vectores unitarios i y j en 2D.",
        steps: [
          "El vector i representa la dirección horizontal positiva.",
          "El vector j representa la dirección vertical positiva.",
        ],
        solution:
          "Los vectores unitarios i y j establecen las direcciones básicas en un plano 2D.",
      },
    ],
    tips: [
      "Utiliza siempre la fórmula de la magnitud para analizar las propiedades del vector.",
      "Recuerda que los vectores unitarios tienen magnitud 1 y sirven como referencia para definir direcciones.",
    ],
  },

  vectores_introduccion_dificil: {
    title: "Introducción a Vectores - Nivel Avanzado",
    description:
      "Análisis profundo de vectores: cálculo de magnitudes, obtención de vectores unitarios y comparación de sistemas de coordenadas (cartesianas vs. polares/esféricas).",
    theory: [
      "La magnitud de un vector en 3D a, b, c se calcula como √(a^2 + b^2 + c^2).",
      "La conversión entre coordenadas cartesianas y polares/esféricas implica el uso de la magnitud y el ángulo o ángulos correspondientes.",
    ],
    examples: [
      {
        problem: "Determina el vector unitario del vector 2, -3, 6.",
        steps: [
          "Calcula la magnitud del vector: √(2^2 + (-3)^2 + 6^2).",
          "Divide cada componente por la magnitud obtenida para hallar el vector unitario.",
        ],
        solution:
          "El vector unitario es (2/√(49), -3/√(49), 6/√(49)), que puede simplificarse a (2/7, -3/7, 6/7).",
      },
      {
        problem:
          "Compara la representación de un punto en coordenadas cartesianas y polares.",
        steps: [
          "En el sistema cartesiano, un punto se representa como x, y.",
          "En el sistema polar, se expresa como r, θ, donde r = √(x^2 + y^2) y θ = tan^-1(y/x).",
        ],
        solution:
          "La conversión entre ambos sistemas requiere calcular la magnitud y el ángulo, demostrando la equivalencia en la representación del punto.",
      },
    ],
    tips: [
      "Verifica cuidadosamente cada paso al calcular magnitudes y vectores unitarios.",
      "Familiarízate con la conversión entre coordenadas cartesianas y polares/esféricas para analizar diferentes representaciones.",
    ],
  },
  vectores_operaciones_facil: {
    title: "Operaciones con Vectores - Nivel Básico",
    description:
      "Introducción a las operaciones básicas con vectores: suma y resta de manera analítica y gráfica.",
    theory: [
      "La suma de vectores se realiza sumando componente a componente.",
      "La resta se efectúa restando cada componente del vector correspondiente.",
      "El método gráfico (regla del paralelogramo) permite visualizar la suma de vectores.",
    ],
    examples: [
      {
        problem:
          "Ejemplo 1: Suma de vectores analíticamente: Suma de (1, 2) y (3, 4).",
        steps: [
          "Identifica cada componente de los vectores: (1, 2) y (3, 4).",
          "Suma las componentes correspondientes: (1 + 3, 2 + 4).",
          "El resultado es (4, 6).",
        ],
        solution: "(1,2)+(3,4) = (4,6)",
      },
      {
        problem: "Ejemplo 2: Resta de vectores: Resta de (5, 7) menos (2, 3).",
        steps: [
          "Identifica las componentes: (5, 7) y (2, 3).",
          "Resta cada componente: (5 - 2, 7 - 3).",
          "El resultado es (3, 4).",
        ],
        solution: "(5,7)-(2,3) = (3,4)",
      },
    ],
    tips: [
      "Revisa cada componente al realizar operaciones.",
      "Dibuja los vectores para visualizar la suma o resta, utilizando el método gráfico si es posible.",
    ],
  },

  vectores_operaciones_medio: {
    title: "Operaciones con Vectores - Nivel Intermedio",
    description:
      "Análisis de operaciones vectoriales utilizando métodos gráfico (regla del paralelogramo) y analítico.",
    theory: [
      "El método gráfico implica trasladar el segundo vector al extremo del primero y formar un paralelogramo.",
      "El método analítico se basa en la suma o resta componente a componente.",
      "Ambos métodos deben arrojar el mismo resultado en la operación vectorial.",
    ],
    examples: [
      {
        problem:
          "Ejemplo 1: Suma de vectores usando el método gráfico: Suma de (2, 3) y (4, -1).",
        steps: [
          "Representa gráficamente (2, 3) y (4, -1).",
          "Coloca el origen de (4, -1) en el extremo de (2, 3) y dibuja el paralelogramo.",
          "El vector resultante, que une el origen con el vértice opuesto, es la suma.",
          "Analíticamente, suma: (2 + 4, 3 + (-1)) = (6, 2).",
        ],
        solution: "(2,3)+(4,-1) = (6,2)",
      },
      {
        problem:
          "Ejemplo 2: Resta de vectores de forma analítica: Resta de (3, 5) menos (1, 2).",
        steps: [
          "Identifica cada componente: (3, 5) y (1, 2).",
          "Realiza la resta componente a componente: (3 - 1, 5 - 2).",
          "El resultado es (2, 3).",
        ],
        solution: "(3,5)-(1,2) = (2,3)",
      },
    ],
    tips: [
      "Verifica que los métodos gráfico y analítico coincidan en el resultado.",
      "Dibuja el paralelogramo para una mejor comprensión visual.",
    ],
  },

  vectores_operaciones_dificil: {
    title: "Operaciones con Vectores - Nivel Avanzado",
    description:
      "Aplicación de operaciones avanzadas con vectores, incluyendo el producto escalar, determinación de ángulos y proyecciones.",
    theory: [
      "El producto escalar se define como a · b = |a||b|cosθ.",
      "El ángulo entre dos vectores se puede obtener de cosθ = (a · b) / (|a||b|).",
      "La proyección de un vector sobre otro se calcula utilizando el producto escalar y la magnitud del vector base.",
    ],
    examples: [
      {
        problem:
          "Ejemplo 1: Cálculo del producto escalar y ángulo entre (3, 4) y (2, -1).",
        steps: [
          "Calcula el producto escalar: (3 · 2) + (4 · (-1)) = 6 - 4 = 2.",
          "Determina la magnitud de (3,4): |(3,4)| = √(3²+4²)=5.",
          "Determina la magnitud de (2,-1): |(2,-1)| = √(2²+(-1)²)=√5.",
          "Calcula el coseno del ángulo: cosθ = (2)/(5·√5).",
          "El ángulo θ se obtiene aplicando la función arccos a este resultado.",
        ],
        solution:
          "a · b = 2, |a| = 5, |b| = √5, cosθ = 2/(5√5), θ = arccos(2/(5√5))",
      },
      {
        problem:
          "Ejemplo 2: Proyección del vector (4, 3) sobre el vector (1, 0).",
        steps: [
          "Calcula el producto escalar: (4,3) · (1,0) = 4.",
          "Calcula la magnitud al cuadrado del vector (1,0): 1²+0² = 1.",
          "La proyección es: (4/1) · (1,0) = (4, 0).",
        ],
        solution: "proy_(1,0)(4,3) = (4,0)",
      },
    ],
    tips: [
      "Utiliza la fórmula del producto escalar para determinar ángulos y proyecciones.",
      "Asegúrate de calcular correctamente las magnitudes de los vectores.",
      "Aplica la función arccos para obtener el ángulo en radianes o grados, según sea necesario.",
    ],
  },
  vectores_aplicaciones_facil: {
    title: "Vectores - Nivel Básico",
    description:
      "Introducción a los vectores: representación gráfica, componentes y magnitud.",
    theory: [
      "Un vector se representa como una flecha que tiene magnitud y dirección.",
      "Se puede descomponer en componentes, por ejemplo en los ejes x e y.",
    ],
    examples: [
      {
        problem: "Calcula la magnitud del vector representado por 3, 4.",
        steps: [
          "Identifica las componentes: x = 3 y y = 4.",
          "Aplica la fórmula de la magnitud: |v| = sqrt(3² + 4²).",
          "Realiza el cálculo: sqrt(9 + 16) = sqrt(25) = 5.",
        ],
        solution: "5",
      },
    ],
    tips: [
      "Dibuja el vector para visualizar sus componentes.",
      "Recuerda que la magnitud es la 'longitud' del vector.",
    ],
  },
  vectores_aplicaciones_medio: {
    title: "Vectores - Nivel Intermedio",
    description:
      "Profundización en la manipulación de vectores: cálculos de vectores unitarios y operaciones básicas.",
    theory: [
      "El vector unitario se obtiene dividiendo cada componente del vector por su magnitud.",
      "Es útil para definir direcciones sin considerar la magnitud.",
    ],
    examples: [
      {
        problem: "Determina el vector unitario del vector 6, 8.",
        steps: [
          "Calcula la magnitud: |v| = sqrt(6² + 8²) = sqrt(36 + 64) = sqrt(100) = 10.",
          "Divide cada componente del vector por la magnitud: (6/10, 8/10).",
        ],
        solution: "(0.6, 0.8)",
      },
    ],
    tips: [
      "Verifica siempre la magnitud antes de calcular el vector unitario.",
      "Un vector unitario tiene magnitud 1.",
    ],
  },
  vectores_aplicaciones_dificil: {
    title: "Vectores - Nivel Avanzado",
    description:
      "Análisis avanzado de vectores: proyecciones y operaciones vectoriales.",
    theory: [
      "La proyección de un vector sobre otro se calcula usando el producto escalar y la magnitud del vector base.",
      "Esta operación permite obtener la componente de un vector en la dirección de otro.",
    ],
    examples: [
      {
        problem:
          "Encuentra la proyección del vector 4, 3 sobre el vector 2, 0.",
        steps: [
          "Calcula el producto escalar: 4 · 2 + 3 · 0 = 8.",
          "Calcula la magnitud al cuadrado del vector base: |2,0|² = 2² + 0² = 4.",
          "Aplica la fórmula de proyección: proj = (8/4) · (2, 0).",
          "Realiza la multiplicación: 2 · (2,0) = (4, 0).",
        ],
        solution: "(4, 0)",
      },
    ],
    tips: [
      "Asegúrate de calcular correctamente el producto escalar.",
      "Revisa que el vector base no sea el vector nulo antes de aplicar la proyección.",
    ],
  },
  vectores_espacios_facil: {
    title: "Vectores en Espacios Abstractos - Nivel Básico",
    description:
      "Introducción a la definición axiomática de espacios vectoriales, enfatizando la cerradura y la conmutatividad.",
    theory: [
      "Un espacio vectorial es un conjunto cuyos elementos (vectores) cumplen ciertos axiomas.",
      "La cerradura en la suma significa que la suma de dos vectores del conjunto resulta en otro vector del mismo conjunto.",
      "La propiedad conmutativa establece que el orden en la suma de vectores no altera el resultado.",
    ],
    examples: [
      {
        problem:
          "Verifica la propiedad de cerradura en el conjunto de vectores: { [1, 2] ,  [3, 4] }",
        steps: [
          "Suma los vectores:  [1, 2]  +  [3, 4]  =  [4, 6] .",
          "Comprueba que  [4, 6]  podría pertenecer al conjunto si éste se define para incluirlo.",
          "Concluye que se cumple la propiedad de cerradura bajo la suma si el resultado está en el conjunto.",
        ],
        solution:
          "El conjunto cumple la propiedad de cerradura si  [4, 6]  forma parte del mismo.",
      },
    ],
    tips: [
      "Recuerda que la cerradura se refiere a que el resultado de la operación debe pertenecer al conjunto definido.",
      "Verifica siempre que el vector resultante esté incluido en el conjunto.",
    ],
  },

  // VECTORES - NIVEL INTERMEDIO
  vectores_espacios_medio: {
    title: "Vectores en Espacios Abstractos - Nivel Intermedio",
    description:
      "Profundización en los axiomas de espacios vectoriales, haciendo especial énfasis en la conmutatividad y la existencia del vector cero.",
    theory: [
      "Además de la cerradura, un espacio vectorial debe incluir un elemento neutro (vector cero) y cumplir la existencia de inversos aditivos.",
      "La conmutatividad de la suma es clave:  [a, b]  +  [c, d]  =  [c, d]  +  [a, b] .",
    ],
    examples: [
      {
        problem:
          "Demuestra la propiedad conmutativa para la suma de vectores:  [a, b]  y  [c, d] .",
        steps: [
          "Calcula  [a, b]  +  [c, d]  obteniendo  [a+c, b+d] .",
          "Calcula  [c, d]  +  [a, b]  obteniendo  [c+a, d+b] .",
          "Observa que  [a+c, b+d]  es igual a  [c+a, d+b]  por la propiedad conmutativa de la suma de números.",
        ],
        solution: "La suma es conmutativa, pues  [a+c, b+d]  =  [c+a, d+b] .",
      },
      {
        problem:
          "Verifica la existencia del vector cero en un espacio de dos dimensiones.",
        steps: [
          "Identifica el vector cero como  [0, 0] .",
          "Suma cualquier vector  [a, b]  con  [0, 0]  y comprueba que  [a, b]  permanece inalterado.",
          "Confirma que el vector cero cumple la función de elemento neutro.",
        ],
        solution:
          "El vector  [0, 0]  es el elemento neutro en la suma de vectores.",
      },
    ],
    tips: [
      "Asegúrate de repasar cada axioma del espacio vectorial para identificar correctamente sus propiedades.",
      "Demuestra paso a paso cada axioma con ejemplos claros.",
    ],
  },

  // VECTORES - NIVEL AVANZADO
  vectores_espacios_dificil: {
    title: "Vectores en Espacios Abstractos - Nivel Avanzado",
    description:
      "Análisis detallado de bases, dimensión e independencia lineal en espacios vectoriales.",
    theory: [
      "La base de un espacio vectorial es un conjunto de vectores linealmente independientes que generan el espacio.",
      "La dimensión se define como el número de vectores en una base.",
      "Un conjunto de vectores es linealmente independiente si la única combinación lineal que resulta en el vector cero es la trivial.",
    ],
    examples: [
      {
        problem:
          "Determina si los vectores  [1, 0, 0] ,  [0, 1, 0]  y  [0, 0, 1]  forman una base en  ℝ³ .",
        steps: [
          "Observa que cada vector posee un 1 en una posición única y 0 en las demás.",
          "Verifica que no existe combinación no trivial que de como resultado el vector cero  [0, 0, 0] .",
          "Concluye que estos vectores son linealmente independientes y generan  ℝ³ .",
        ],
        solution:
          "Los vectores son una base de  ℝ³  y, por tanto, la dimensión es 3.",
      },
      {
        problem:
          "Comprueba la independencia lineal de los vectores  [2, 4]  y  [1, 2] .",
        steps: [
          "Plantea la combinación lineal:  c₁[2, 4] + c₂[1, 2] = [0, 0] .",
          "Forma el sistema de ecuaciones: 2c₁ + c₂ = 0 y 4c₁ + 2c₂ = 0.",
          "Determina que la única solución es la trivial  c₁ = 0, c₂ = 0 , lo que implica independencia lineal.",
        ],
        solution:
          "Los vectores  [2, 4]  y  [1, 2]  son linealmente independientes.",
      },
    ],
    tips: [
      "Para comprobar la independencia lineal, verifica que la única solución del sistema sea la trivial.",
      "Utiliza sistemas de ecuaciones para fundamentar la independencia en espacios de mayor dimensión.",
    ],
  },

  //LIMITES
  limites_introduccion_facil: {
    title: "Fundamentos de Límites - Nivel Básico",
    description:
      "Introducción a la definición de límites y los conceptos básicos que permiten comprender el comportamiento de las funciones cerca de un punto.",
    theory: [
      "Un límite describe el comportamiento de una función a medida que la variable se acerca a un valor específico.",
      "Si la función es continua en ese punto, el límite se obtiene al sustituir directamente el valor en la función.",
    ],
    examples: [
      {
        problem: "Calcula el límite: \\(\\lim_{x \\to 2} (x + 3)\\)",
        steps: [
          "Observa que la función es continua en x = 2.",
          "Sustituye x por 2 en la expresión: \\(2 + 3\\).",
          "El resultado es 5.",
        ],
        solution: "\\(5\\)",
      },
      {
        problem: "Determina el límite: \\(\\lim_{x \\to 0} (2x)\\)",
        steps: [
          "La función es lineal y continua en x = 0.",
          "Sustituye x = 0 en la función: \\(2 \\times 0 = 0\\).",
          "Por lo tanto, el límite es 0.",
        ],
        solution: "\\(0\\)",
      },
    ],
    tips: [
      "Si la función es continua, sustituye el valor directamente.",
      "Verifica siempre la continuidad en el punto de interés.",
    ],
  },

  limites_introduccion_medio: {
    title: "Fundamentos de Límites - Nivel Intermedio",
    description:
      "Exploración de propiedades de los límites y técnicas para resolver expresiones con indeterminaciones removibles.",
    theory: [
      "Las propiedades de los límites permiten separar y simplificar expresiones complejas.",
      "La factorización puede ayudar a eliminar indeterminaciones del tipo \\(0/0\\).",
    ],
    examples: [
      {
        problem:
          "Calcula el límite: \\(\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}\\)",
        steps: [
          "Observa la indeterminación \\(0/0\\) al sustituir x = 3.",
          "Factoriza el numerador: \\(x^2 - 9 = (x - 3)(x + 3)\\).",
          "Cancela el factor común \\((x - 3)\\).",
          "Sustituye x = 3 en la expresión simplificada: \\(3 + 3 = 6\\).",
        ],
        solution: "\\(6\\)",
      },
      {
        problem:
          "Determina el límite lateral: \\(\\lim_{x \\to 0^+} \\frac{1}{x}\\)",
        steps: [
          "Analiza el comportamiento de la función cuando x se acerca a 0 por la derecha.",
          "A medida que x se hace muy pequeño, la función crece sin límite.",
        ],
        solution: "El límite es infinito.",
      },
    ],
    tips: [
      "Para expresiones con \\(0/0\\), intenta factorizar y cancelar términos comunes.",
      "En límites laterales, analiza la dirección desde la cual x se aproxima al valor.",
    ],
  },

  limites_introduccion_dificil: {
    title: "Fundamentos de Límites - Nivel Avanzado",
    description:
      "Análisis detallado de técnicas avanzadas en límites, incluyendo la aplicación de la regla de L'Hôpital para resolver indeterminaciones complejas.",
    theory: [
      "La regla de L'Hôpital se aplica cuando se presenta una indeterminación del tipo \\(0/0\\) o \\(\\infty/\\infty\\).",
      "Diferenciando el numerador y el denominador se puede resolver la indeterminación.",
    ],
    examples: [
      {
        problem:
          "Aplica la regla de L'Hôpital para resolver: \\(\\lim_{x \\to 0} \\frac{\\sin x}{x}\\)",
        steps: [
          "Al sustituir x = 0 se obtiene \\(0/0\\), lo que permite usar L'Hôpital.",
          "Deriva el numerador: \\(\\frac{d}{dx}(\\sin x)=\\cos x\\) y el denominador: \\(\\frac{d}{dx}(x)=1\\).",
          "El límite se convierte en: \\(\\lim_{x \\to 0} \\cos x = 1\\).",
        ],
        solution: "\\(1\\)",
      },
      {
        problem:
          "Determina el límite: \\(\\lim_{x \\to \\infty} \\frac{2x^2 + 3}{x^2}\\)",
        steps: [
          "Divide tanto el numerador como el denominador por \\(x^2\\), la mayor potencia de x presente.",
          "La expresión se simplifica a: \\(2 + \\frac{3}{x^2}\\).",
          "Al evaluar el límite para x tendiendo a infinito, \\(\\frac{3}{x^2} \\to 0\\), dejando: \\(2\\).",
        ],
        solution: "\\(2\\)",
      },
    ],
    tips: [
      "Utiliza la regla de L'Hôpital únicamente cuando se presente una indeterminación verificable.",
      "Simplifica las expresiones dividiendo por la mayor potencia de x para evaluar límites al infinito.",
    ],
  },

  limites_calculos_facil: {
    title: "Cálculo de Límites - Nivel Básico",
    description:
      "Introducción al cálculo de límites, enfocándose en límites laterales, límites infinitos y algunos límites notables.",
    theory: [
      "El límite de una función \\(f(x)\\) cuando x se acerca a un valor a se denota por \\(\\lim_{x \\to a} f(x)\\).",
      "Los límites laterales indican el comportamiento de la función al acercarse a un punto desde la derecha o desde la izquierda.",
      "Los límites infinitos se presentan cuando la función tiende a \\(+\\infty\\) o \\(-\\infty\\) al acercarse a un valor.",
    ],
    examples: [
      {
        problem:
          "Determina el límite lateral derecho de la función: f(x) = 1/x cuando x se acerca a 0.",
        steps: [
          "Observa que la función está definida para x > 0 en este caso.",
          "Cuando x se acerca a 0 desde valores positivos, \\(1/x\\) crece sin límite.",
          "Por lo tanto, se concluye que \\(\\lim_{x \\to 0^+} 1/x = +\\infty\\).",
        ],
        solution: "\\(+\\infty\\)",
      },
      {
        problem:
          "Calcula el límite: \\(\\lim_{x \\to \\infty} \\frac{2x+3}{x}\\).",
        steps: [
          "Divide numerador y denominador por x para simplificar la fracción.",
          "La expresión se transforma en: \\(\\frac{2 + 3/x}{1}\\).",
          "Al evaluar el límite, \\(3/x\\) tiende a 0 y se obtiene el valor 2.",
        ],
        solution: "2",
      },
    ],
    tips: [
      "Revisa la notación de límites y la diferencia entre límites laterales e infinitos.",
      "Observa el comportamiento de la función al acercarse a puntos críticos o a infinito.",
    ],
  },

  limites_calculos_medio: {
    title: "Cálculo de Límites - Nivel Intermedio",
    description:
      "Profundización en el cálculo de límites, abordando indeterminaciones y el análisis detallado de límites laterales e infinitos.",
    theory: [
      "Las indeterminaciones como \\(\\frac{0}{0}\\) y \\(\\frac{\\infty}{\\infty}\\) requieren técnicas algebraicas para resolverlas.",
      "El análisis de límites laterales implica evaluar la función por la derecha y por la izquierda.",
      "Dividir los términos de mayor grado facilita la determinación del comportamiento en el infinito.",
    ],
    examples: [
      {
        problem: "Evalúa el límite: \\(\\lim_{x \\to 0^+} \\ln(x)\\).",
        steps: [
          "Observa que la función ln(x) solo se define para x > 0.",
          "Cuando x se acerca a 0 por la derecha, ln(x) disminuye sin límite.",
          "Por lo tanto, \\(\\lim_{x \\to 0^+} \\ln(x) = -\\infty\\).",
        ],
        solution: "\\(-\\infty\\)",
      },
      {
        problem:
          "Determina el límite: \\(\\lim_{x \\to -\\infty} \\frac{x^2 - 1}{2x^2 + 3}\\).",
        steps: [
          "Divide el numerador y el denominador por \\(x^2\\), el término de mayor grado.",
          "La fracción se convierte en: \\(\\frac{1 - 1/x^2}{2 + 3/x^2}\\).",
          "Al evaluar el límite, los términos con x en el denominador se anulan, resultando en \\(1/2\\).",
        ],
        solution: "\\(1/2\\)",
      },
    ],
    tips: [
      "Simplifica las expresiones para identificar indeterminaciones y resuélvelas con técnicas algebraicas.",
      "Analiza cuidadosamente el comportamiento de la función en ambos lados del punto de interés.",
    ],
  },

  limites_calculos_dificil: {
    title: "Cálculo de Límites - Nivel Avanzado",
    description:
      "Análisis detallado de límites notables y límites de funciones compuestas, aplicando técnicas avanzadas como la regla de L'Hôpital.",
    theory: [
      "El cálculo de límites notables requiere reconocer formas indeterminadas y aplicar técnicas como la regla de L'Hôpital cuando corresponda.",
      "Un ejemplo clásico es \\(\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1\\), que se utiliza en diversos contextos.",
      "La definición de la constante \\(\\e\\) se obtiene mediante el límite \\(\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x\\).",
    ],
    examples: [
      {
        problem:
          "Calcula el límite: \\(\\lim_{x \\to 0} \\frac{\\sin(x)}{x}\\).",
        steps: [
          "Reconoce que se trata de un límite notable presente en muchos cursos de cálculo.",
          "Utiliza el resultado estándar que establece que \\(\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1\\).",
        ],
        solution: "1",
      },
      {
        problem:
          "Determina el límite: \\(\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x\\).",
        steps: [
          "Identifica la expresión como la definición de la constante \\(\\e\\).",
          "Conforme x tiende a infinito, la expresión se aproxima al valor de \\(\\e\\).",
        ],
        solution: "\\(\\e\\)",
      },
    ],
    tips: [
      "Aplica la regla de L'Hôpital para resolver indeterminaciones cuando sea necesario.",
      "Familiarízate con los límites notables, ya que son fundamentales en el análisis de funciones complejas.",
    ],
  },

  limites_continuidad_facil: {
    title: "Concepto de Continuidad - Nivel Básico",
    description:
      "Introducción al concepto de continuidad en funciones y su importancia en el análisis matemático.",
    theory: [
      "Una función es continua si no presenta interrupciones ni saltos en su dominio.",
      "La continuidad en un punto significa que el límite cuando x se aproxima al punto es igual al valor de la función en ese punto.",
    ],
    examples: [
      {
        problem: "Determina si la función \\(f(x)=x\\) es continua en x=3.",
        steps: [
          "Calcula el valor de la función en x=3: \\(f(3)=3\\).",
          "Determina el límite cuando x se aproxima a 3: \\(\\lim_{x \\to 3} f(x)=3\\).",
          "Como el valor de \\(f(3)\\) y el límite son iguales, la función es continua en ese punto.",
        ],
        solution: "La función \\(f(x)=x\\) es continua en x=3.",
      },
      {
        problem:
          "Verifica la continuidad de la función \\(f(x)=2x+1\\) en x=0.",
        steps: [
          "Calcula \\(f(0)=1\\).",
          "Calcula el límite: \\(\\lim_{x \\to 0} (2x+1)=1\\).",
          "Al coincidir ambos valores, se concluye que la función es continua en x=0.",
        ],
        solution: "La función \\(f(x)=2x+1\\) es continua en x=0.",
      },
    ],
    tips: [
      "Verifica siempre que el límite y el valor de la función sean iguales en el punto evaluado.",
      "Para funciones lineales, la continuidad se garantiza en todo su dominio.",
    ],
  },

  limites_continuidad_medio: {
    title: "Continuidad en Funciones Racionales - Nivel Intermedio",
    description:
      "Profundización en la continuidad de funciones racionales y el manejo de discontinuidades removibles.",
    theory: [
      "Una función racional es continua en los puntos donde su denominador no es cero.",
      "Las discontinuidades removibles se pueden corregir redefiniendo el valor de la función en el punto problemático.",
    ],
    examples: [
      {
        problem:
          "Analiza la continuidad de \\(f(x)=\\frac{x^2-1}{x-1}\\) en x=1.",
        steps: [
          "Sustituyendo x=1 se obtiene la indeterminación \\(0/0\\).",
          "Factoriza el numerador: \\(x^2-1=(x-1)(x+1)\\).",
          "Simplifica la función para \\(x \\neq 1\\): \\(f(x)=x+1\\).",
          "Calcula el límite cuando x se aproxima a 1: \\(\\lim_{x \\to 1} f(x)=2\\).",
          "Como f(1) no está definida, se trata de una discontinuidad removible.",
        ],
        solution: "La función presenta una discontinuidad removible en x=1.",
      },
      {
        problem:
          "Determina la continuidad de \\(f(x)=\\frac{3x+2}{x+4}\\) en x=-4.",
        steps: [
          "El denominador se hace cero en x=-4, lo que implica que la función no está definida en ese punto.",
        ],
        solution:
          "La función es discontinua en x=-4 debido a que el denominador es cero.",
      },
    ],
    tips: [
      "Identifica los valores que anulan el denominador en funciones racionales.",
      "Simplifica las funciones para detectar posibles discontinuidades removibles.",
    ],
  },

  limites_continuidad_dificil: {
    title: "Teoremas Fundamentales de Continuidad - Nivel Avanzado",
    description:
      "Análisis profundo de teoremas como el valor intermedio y el de Bolzano para funciones continuas.",
    theory: [
      "El teorema del valor intermedio establece que una función continua en un intervalo toma todos los valores entre \\(f(a)\\) y \\(f(b)\\).",
      "El teorema de Bolzano garantiza que, si una función continua cambia de signo en un intervalo, existe al menos una raíz en dicho intervalo.",
    ],
    examples: [
      {
        problem:
          "Usa el teorema del valor intermedio para demostrar que \\(f(x)=x^3+2x-5\\) tiene al menos una raíz en el intervalo [1,2].",
        steps: [
          "Calcula \\(f(1)=1+2-5=-2\\).",
          "Calcula \\(f(2)=8+4-5=7\\).",
          "Como \\(f(1)\\) y \\(f(2)\\) tienen signos opuestos y la función es continua, se garantiza la existencia de una raíz en [1,2].",
        ],
        solution: "La función tiene al menos una raíz en el intervalo [1,2].",
      },
      {
        problem:
          "Demuestra que la función \\(f(x)=\\frac{1}{1+e^{-x}}\\) es continua en \\(\\mathbb{R}\\).",
        steps: [
          "La función exponencial \\(e^{-x}\\) es continua en \\(\\mathbb{R}\\).",
          "La suma \\(1+e^{-x}\\) y la división de funciones continuas son continuas, siempre que el denominador no sea cero.",
          "Como \\(1+e^{-x}\\) nunca es cero, se concluye que la función es continua en \\(\\mathbb{R}\\).",
        ],
        solution:
          "La función \\(f(x)=\\frac{1}{1+e^{-x}}\\) es continua en todo \\(\\mathbb{R}\\).",
      },
    ],
    tips: [
      "Utiliza los teoremas del valor intermedio y de Bolzano para justificar la existencia de raíces.",
      "Analiza la continuidad combinando propiedades de funciones elementales y compuestas.",
    ],
  },

  limites_aplicaciones_facil: {
    title: "Aplicaciones de los Límites - Nivel Básico",
    description:
      "Introducción al uso de límites en cálculos sencillos del cálculo diferencial.",
    theory: [
      "El límite de una función en un punto es el valor al que se aproxima la función cuando la variable se acerca a ese punto.",
      "Se utiliza para analizar el comportamiento de funciones en puntos específicos y verificar continuidad.",
    ],
    examples: [
      {
        problem: "Evalúa \\(\\lim_{x \\to 3} (x + 2)\\).",
        steps: [
          "Sustituye el valor de x por 3 en la expresión \\(x + 2\\).",
          "Obtienes \\(3 + 2 = 5\\).",
        ],
        solution: "El límite es 5.",
      },
      {
        problem: "Calcula \\(\\lim_{x \\to 0} (2x + 1)\\).",
        steps: [
          "Reemplaza x por 0 en la expresión \\(2x + 1\\).",
          "El resultado es \\(2(0) + 1 = 1\\).",
        ],
        solution: "El límite es 1.",
      },
    ],
    tips: [
      "Verifica la continuidad de la función en el punto de evaluación.",
      "Si la función es continua, la sustitución directa es válida.",
    ],
  },

  limites_aplicaciones_medio: {
    title: "Aplicaciones de los Límites - Nivel Intermedio",
    description:
      "Uso de límites para definir derivadas y simplificar expresiones algebraicas en el cálculo diferencial.",
    theory: [
      "La derivada de una función se define como el límite del cociente incremental.",
      "La fórmula \\(\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}\\) es la base para calcular la derivada de una función en un punto.",
    ],
    examples: [
      {
        problem:
          "Encuentra la derivada de \\(f(x)=x^2\\) en x = 3 usando \\(\\lim_{h \\to 0} \\frac{(3+h)^2 - 9}{h}\\).",
        steps: [
          "Expande \\((3+h)^2\\) para obtener \\(9 + 6h + h^2\\).",
          "Sustituye en el límite: \\(\\lim_{h \\to 0} \\frac{9 + 6h + h^2 - 9}{h} = \\lim_{h \\to 0} \\frac{6h + h^2}{h}\\).",
          "Simplifica dividiendo h: \\(\\lim_{h \\to 0} (6 + h)\\).",
          "Al sustituir \\(h = 0\\), el resultado es 6.",
        ],
        solution: "La derivada en x = 3 es 6.",
      },
      {
        problem: "Determina \\(\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1}\\).",
        steps: [
          "Factoriza el numerador: \\(x^2 - 1 = (x-1)(x+1)\\).",
          "Cancela el factor común \\((x-1)\\) y se obtiene \\(\\lim_{x \\to 1} (x+1)\\).",
          "Sustituye x = 1 para obtener \\(1 + 1 = 2\\).",
        ],
        solution: "El límite es 2.",
      },
    ],
    tips: [
      "La factorización es útil para simplificar expresiones indeterminadas.",
      "Utiliza la definición de derivada para entender el concepto del límite como tasa de cambio.",
    ],
  },

  limites_aplicaciones_dificil: {
    title: "Aplicaciones de los Límites - Nivel Avanzado",
    description:
      "Evaluación de límites con formas indeterminadas y su aplicación en el análisis diferencial avanzado.",
    theory: [
      "Los límites permiten resolver indeterminaciones mediante técnicas algebraicas o el uso de la regla de L'Hôpital.",
      "Son esenciales para analizar el comportamiento local de funciones complejas y obtener resultados precisos.",
    ],
    examples: [
      {
        problem: "Evalúa \\(\\lim_{x \\to 0} \\frac{\\sin(x)}{x}\\).",
        steps: [
          "Reconoce que se trata de un límite notable en cálculo diferencial.",
          "Este límite es conocido y su resultado es 1.",
        ],
        solution: "El límite es 1.",
      },
      {
        problem: "Calcula \\(\\lim_{x \\to 0} \\frac{e^x - 1}{x}\\).",
        steps: [
          "Observa que al sustituir x = 0 se obtiene una forma indeterminada \\(0/0\\).",
          "Aplica la regla de L'Hôpital: deriva el numerador \\(e^x\\) y el denominador \\(1\\).",
          "Al sustituir x = 0 en \\(e^x\\), se obtiene \\(e^0 = 1\\).",
        ],
        solution: "El límite es 1.",
      },
      {
        problem:
          "Determina \\(\\lim_{h \\to 0} \\frac{\\sqrt{a+h} - \\sqrt{a}}{h}\\) para un valor positivo de a.",
        steps: [
          "Multiplica por el conjugado: \\(\\frac{\\sqrt{a+h} - \\sqrt{a}}{h} \\cdot \\frac{\\sqrt{a+h} + \\sqrt{a}}{\\sqrt{a+h} + \\sqrt{a}}\\).",
          "El numerador se convierte en \\(a+h - a = h\\) y se cancela el h.",
          "El resultado es \\(\\frac{1}{\\sqrt{a+h} + \\sqrt{a}}\\), que al tomar el límite \\(h = 0\\) se transforma en \\(\\frac{1}{2\\sqrt{a}}\\).",
        ],
        solution: "El límite es \\(\\frac{1}{2\\sqrt{a}}\\).",
      },
    ],
    tips: [
      "Utiliza técnicas algebraicas, como la multiplicación por el conjugado, para resolver indeterminaciones.",
      "La regla de L'Hôpital es fundamental para evaluar límites de forma indeterminada.",
    ],
  },

  //DERIVADAS
  derivadas_fundamentos_facil: {
    title: "Fundamentos de Derivadas - Nivel Básico",
    description:
      "Introducción a la definición de derivadas y su interpretación básica, abordando qué es una derivada y su representación geométrica.",
    theory: [
      "Una derivada representa la tasa de cambio instantánea de una función.",
      "Geométricamente, es la pendiente de la tangente a la curva en un punto.",
    ],
    examples: [
      {
        problem:
          "Determina la derivada de \\(f(x) = x^2\\) en \\(x = 2\\) utilizando la definición de derivada.",
        steps: [
          "Usa la fórmula de la derivada: \\(f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}\\).",
          "Sustituye \\(f(x)=x^2\\) para obtener \\(f'(2) = \\lim_{h \\to 0} \\frac{(2+h)^2 - 4}{h}\\).",
          "Desarrolla el numerador: \\((2+h)^2 = 4 + 4h + h^2\\) y simplifica la expresión.",
          "Toma el límite cuando \\(h\\) tiende a 0.",
        ],
        solution: "\\(f'(2) = 4\\)",
      },
    ],
    tips: [
      "Recuerda que la derivada es la pendiente de la curva en un punto específico.",
      "Aplica la definición de límite para comprender el proceso de derivación.",
    ],
  },

  derivadas_fundamentos_medio: {
    title: "Fundamentos de Derivadas - Nivel Intermedio",
    description:
      "Profundización en el cálculo de derivadas mediante reglas básicas y en la interpretación física y geométrica de la tasa de cambio.",
    theory: [
      "La derivada se interpreta también como la velocidad instantánea en el movimiento.",
      "La representación gráfica de la derivada corresponde a la pendiente de la tangente a la función en cada punto.",
    ],
    examples: [
      {
        problem:
          "Calcula la derivada de \\(f(x) = 3x^3\\) utilizando la regla de la potencia.",
        steps: [
          "Aplica la regla de la potencia: \\(\\frac{d}{dx}(x^n) = n \\cdot x^{n-1}\\).",
          "Multiplica por la constante: \\(f'(x) = 3 \\cdot 3x^2\\).",
          "Simplifica el resultado: \\(f'(x) = 9x^2\\).",
        ],
        solution: "\\(f'(x) = 9x^2\\)",
      },
      {
        problem:
          "Explica la interpretación física de la derivada para la función de posición \\(s(t) = t^2\\).",
        steps: [
          "La derivada de \\(s(t)\\) representa la velocidad del objeto.",
          "Calcula: \\(s'(t) = \\frac{d}{dt}(t^2) = 2t\\).",
          "Interpreta que la velocidad aumenta linealmente con el tiempo.",
        ],
        solution: "La velocidad en \\(t\\) es \\(2t\\)",
      },
    ],
    tips: [
      "Utiliza las reglas de derivación para agilizar los cálculos.",
      "Relaciona la derivada con la interpretación física para visualizar su significado en contextos reales.",
    ],
  },

  derivadas_fundamentos_dificil: {
    title: "Fundamentos de Derivadas - Nivel Avanzado",
    description:
      "Análisis detallado de la definición formal de la derivada, propiedades y aplicaciones, enfatizando el uso de límites y la demostración de fórmulas.",
    theory: [
      "La derivada se define formalmente como: \\(f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}\\).",
      "Este concepto permite analizar comportamientos locales de funciones y es fundamental en problemas de optimización.",
    ],
    examples: [
      {
        problem:
          "Demuestra la derivada de \\(f(x) = \\sin(x)\\) utilizando el límite y la identidad trigonométrica.",
        steps: [
          "Expresa \\(\\sin(x+h)\\) como: \\(\\sin(x+h) = \\sin(x)\\cos(h) + \\cos(x)\\sin(h)\\).",
          "Plantea la definición: \\(f'(x) = \\lim_{h \\to 0} \\frac{\\sin(x+h) - \\sin(x)}{h}\\).",
          "Separa los términos y utiliza los límites conocidos: \\(\\lim_{h \\to 0} \\frac{\\cos(h) - 1}{h} = 0\\) y \\(\\lim_{h \\to 0} \\frac{\\sin(h)}{h} = 1\\).",
          "Concluye que: \\(f'(x) = \\cos(x)\\).",
        ],
        solution: "\\(f'(x) = \\cos(x)\\)",
      },
      {
        problem:
          "Analiza la derivada de \\(f(x) = e^x\\) y explica su propiedad única.",
        steps: [
          "Utiliza la regla de derivación para funciones exponenciales: \\(\\frac{d}{dx}(e^x) = e^x\\).",
          "Observa que la derivada de \\(e^x\\) es la misma función, lo que la hace única.",
          "Discute la importancia de esta propiedad en problemas de crecimiento exponencial.",
        ],
        solution: "\\(f'(x) = e^x\\)",
      },
    ],
    tips: [
      "Revisa detalladamente la aplicación del límite en la definición formal de la derivada.",
      "Profundiza en propiedades únicas de funciones trascendentales como \\(\\sin(x)\\) y \\(e^x\\) para un entendimiento más avanzado.",
    ],
  },

  derivadas_regla_de_derivacion_facil: {
    title: "Reglas de Derivación - Nivel Básico",
    description:
      "Introducción a la derivación usando la regla del poder, suma y diferencia.",
    theory: [
      "La derivada de \\(x^n\\) es \\(n \\cdot x^{n-1}\\).",
      "La derivada de una suma se obtiene sumando las derivadas de cada término: \\( (f(x) + g(x))' = f'(x) + g'(x) \\).",
      "La derivada de una diferencia se obtiene restando las derivadas: \\( (f(x) - g(x))' = f'(x) - g'(x) \\).",
    ],
    examples: [
      {
        problem: "Deriva la función: \\(f(x) = x^3\\).",
        steps: [
          "Aplica la regla del poder: la derivada de \\(x^3\\) es \\(3 \\cdot x^{3-1}\\).",
          "Simplifica el exponente: \\(3 \\cdot x^2\\).",
        ],
        solution: "La derivada es \\(3x^2\\).",
      },
      {
        problem: "Deriva la función: \\(f(x) = x^3 + 2x\\).",
        steps: [
          "Calcula la derivada de cada término: de \\(x^3\\) obtenemos \\(3x^2\\) y de \\(2x\\) obtenemos \\(2\\).",
          "Suma las derivadas: \\(3x^2 + 2\\).",
        ],
        solution: "La derivada es \\(3x^2 + 2\\).",
      },
    ],
    tips: [
      "Aplica la regla del poder individualmente en cada término.",
      "Asegúrate de simplificar los resultados en cada paso.",
    ],
  },

  derivadas_regla_de_derivacion_medio: {
    title: "Reglas de Derivación - Nivel Intermedio",
    description:
      "Aplicación de la derivación en funciones que involucran producto y cociente de funciones.",
    theory: [
      "La regla del producto establece que: \\( (f(x) \\cdot g(x))' = f'(x) \\cdot g(x) + f(x) \\cdot g'(x) \\).",
      "La regla del cociente se expresa como: \\( \\left(\\frac{f(x)}{g(x)}\\right)' = \\frac{f'(x)\\cdot g(x) - f(x)\\cdot g'(x)}{(g(x))^2} \\).",
    ],
    examples: [
      {
        problem: "Deriva la función: \\(f(x) = x^2 \\cdot \\sin(x)\\).",
        steps: [
          "Identifica las funciones: sea \\(f(x) = x^2\\) y \\(g(x) = \\sin(x)\\).",
          "Calcula las derivadas: \\(f'(x) = 2x\\) y \\(g'(x) = \\cos(x)\\).",
          "Aplica la regla del producto: \\(2x \\cdot \\sin(x) + x^2 \\cdot \\cos(x)\\).",
        ],
        solution: "La derivada es \\(2x \\sin(x) + x^2 \\cos(x)\\).",
      },
      {
        problem: "Deriva la función: \\(f(x) = \\frac{x^2}{x+1}\\).",
        steps: [
          "Identifica las funciones: \\(f(x) = x^2\\) y \\(g(x) = x+1\\).",
          "Calcula las derivadas: \\(f'(x) = 2x\\) y \\(g'(x) = 1\\).",
          "Aplica la regla del cociente: \\(\\frac{2x\\cdot (x+1) - x^2}{(x+1)^2}\\).",
        ],
        solution: "La derivada es \\(\\frac{2x(x+1) - x^2}{(x+1)^2}\\).",
      },
    ],
    tips: [
      "Revisa cada derivada parcial antes de aplicar la regla del producto o cociente.",
      "Simplifica la expresión final para clarificar el resultado.",
    ],
  },

  derivadas_regla_de_derivacion_dificil: {
    title: "Reglas de Derivación - Nivel Avanzado",
    description:
      "Estudio avanzado de la derivación aplicando la regla de la cadena en funciones compuestas.",
    theory: [
      "La regla de la cadena permite derivar funciones compuestas: \\( (f(g(x)))' = f'(g(x)) \\cdot g'(x) \\).",
      "Es esencial identificar la función interna y la función externa para aplicar correctamente la regla.",
    ],
    examples: [
      {
        problem: "Deriva la función: \\(f(x) = (3x+2)^4\\).",
        steps: [
          "Identifica la función interna: \\(3x+2\\) y la función externa: \\(u^4\\).",
          "Deriva la función externa con respecto a \\(u\\): \\(4u^3\\), luego sustituye \\(u = 3x+2\\).",
          "Deriva la función interna: \\(3\\).",
          "Aplica la regla de la cadena: \\(4 \\cdot (3x+2)^3 \\cdot 3\\).",
          "Simplifica: \\(12(3x+2)^3\\).",
        ],
        solution: "La derivada es \\(12(3x+2)^3\\).",
      },
      {
        problem: "Deriva la función: \\(f(x) = \\sin(2x)\\).",
        steps: [
          "Identifica la función interna: \\(2x\\) y la función externa: \\(\\sin(u)\\).",
          "Deriva la función externa: \\(\\cos(u)\\), luego sustituye \\(u = 2x\\).",
          "Deriva la función interna: \\(2\\).",
          "Aplica la regla de la cadena: \\(\\cos(2x) \\cdot 2\\).",
          "Simplifica el resultado: \\(2\\cos(2x)\\).",
        ],
        solution: "La derivada es \\(2\\cos(2x)\\).",
      },
    ],
    tips: [
      "Separa claramente la función interna de la externa para evitar errores.",
      "Verifica cada paso para asegurar la correcta aplicación de la regla de la cadena.",
    ],
  },

  derivadas_funciones_facil: {
    title: "Derivadas de Funciones Especiales - Nivel Básico",
    description:
      "Introducción a las derivadas de funciones trigonométricas, exponenciales y logarítmicas. Se estudian las reglas básicas de derivación.",
    theory: [
      "La derivada de una función representa la tasa de cambio instantánea.",
      "Se aplican reglas básicas, por ejemplo, la derivada de \\(\\sin(x)\\) es \\(\\cos(x)\\) y la derivada de \\(e^x\\) es \\(e^x\\).",
    ],
    examples: [
      {
        problem: "Derivar la función: \\(f(x) = \\sin(x)\\).",
        steps: [
          "Identifica la función a derivar: \\(\\sin(x)\\).",
          "Aplica la regla básica: la derivada de \\(\\sin(x)\\) es \\(\\cos(x)\\).",
        ],
        solution: "\\(f'(x) = \\cos(x)\\)",
      },
      {
        problem: "Derivar la función: \\(f(x) = e^x\\).",
        steps: [
          "Identifica la función exponencial: \\(e^x\\).",
          "Aplica la regla: la derivada de \\(e^x\\) es igual a \\(e^x\\).",
        ],
        solution: "\\(f'(x) = e^x\\)",
      },
    ],
    tips: [
      "Recuerda las reglas básicas de derivación.",
      "Verifica la función antes de aplicar la regla correspondiente.",
    ],
  },

  derivadas_funciones_medio: {
    title: "Derivadas de Funciones Especiales - Nivel Intermedio",
    description:
      "Profundización en la diferenciación de funciones especiales, abarcando derivadas de funciones logarítmicas y trigonométricas compuestas.",
    theory: [
      "La derivada de \\(\\ln(x)\\) es \\(1/x\\) y la derivada de \\(\\cos(x)\\) es \\(-\\sin(x)\\).",
      "Para funciones compuestas se utiliza la regla de la cadena.",
    ],
    examples: [
      {
        problem: "Derivar la función: \\(f(x) = \\ln(x)\\).",
        steps: [
          "Identifica la función logarítmica: \\(\\ln(x)\\).",
          "Aplica la regla: la derivada de \\(\\ln(x)\\) es \\(1/x\\).",
        ],
        solution: "\\(f'(x) = 1/x\\)",
      },
      {
        problem: "Derivar la función: \\(f(x) = \\cos(2x)\\).",
        steps: [
          "Identifica la función compuesta: \\(\\cos(2x)\\), donde la función interior es \\(2x\\).",
          "Utiliza la regla de la cadena: la derivada de \\(\\cos(u)\\) es \\(-\\sin(u) \\cdot u'\\), con \\(u = 2x\\).",
          "Calcula \\(u' = 2\\).",
          "Por lo tanto, la derivada es \\(f'(x) = -2\\sin(2x)\\).",
        ],
        solution: "\\(f'(x) = -2\\sin(2x)\\)",
      },
    ],
    tips: [
      "Aplica la regla de la cadena cuando trabajes con funciones compuestas.",
      "Simplifica la función antes de derivar si es posible.",
    ],
  },

  derivadas_funciones_dificil: {
    title: "Derivadas de Funciones Especiales - Nivel Avanzado",
    description:
      "Análisis detallado de la diferenciación de funciones especiales, incluyendo derivación implícita y paramétrica en contextos complejos.",
    theory: [
      "La derivación implícita se utiliza cuando la función no está despejada en términos de una sola variable.",
      "La derivación paramétrica implica diferenciar funciones definidas en función de un parámetro y luego obtener \\(\\frac{dy}{dx}\\) dividiendo las derivadas.",
      "Para funciones compuestas y complejas, se combinan diversas reglas de derivación.",
    ],
    examples: [
      {
        problem: "Derivar la función implícita: \\(x^2 + y^2 = 25\\).",
        steps: [
          "Deriva ambos lados de la ecuación respecto a \\(x\\): \\(2x + 2y \\frac{dy}{dx} = 0\\).",
          "Despeja \\(\\frac{dy}{dx}\\): \\(\\frac{dy}{dx} = -\\frac{x}{y}\\).",
        ],
        solution: "\\(\\frac{dy}{dx} = -\\frac{x}{y}\\)",
      },
      {
        problem:
          "Derivar la función paramétrica: Dadas \\(x(t) = t^2\\) y \\(y(t) = \\ln(t)\\), hallar \\(\\frac{dy}{dx}\\).",
        steps: [
          "Deriva \\(x(t)\\) respecto a \\(t\\): \\(\\frac{dx}{dt} = 2t\\).",
          "Deriva \\(y(t)\\) respecto a \\(t\\): \\(\\frac{dy}{dt} = 1/t\\).",
          "Aplica la fórmula de derivadas paramétricas: \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}\\).",
          "Sustituye los valores: \\(\\frac{dy}{dx} = \\frac{1/t}{2t} = \\frac{1}{2t^2}\\).",
        ],
        solution: "\\(\\frac{dy}{dx} = \\frac{1}{2t^2}\\)",
      },
      {
        problem:
          "Derivar la función compuesta compleja: \\(f(x) = e^{\\sin(x)}\\).",
        steps: [
          "Identifica la función compuesta: función exterior \\(e^u\\) y función interior \\(u = \\sin(x)\\).",
          "Deriva la función exterior: la derivada de \\(e^u\\) es \\(e^u\\).",
          "Deriva la función interior: la derivada de \\(\\sin(x)\\) es \\(\\cos(x)\\).",
          "Aplica la regla de la cadena: \\(f'(x) = e^{\\sin(x)} \\cdot \\cos(x)\\).",
        ],
        solution: "\\(f'(x) = e^{\\sin(x)} \\cdot \\cos(x)\\)",
      },
    ],
    tips: [
      "En la derivación implícita, trata a \\(y\\) como función de \\(x\\).",
      "Para derivadas paramétricas, divide \\(dy/dt\\) entre \\(dx/dt\\) para obtener \\(dy/dx\\).",
      "Combina las reglas de derivación según la complejidad de la función.",
    ],
  },

  derivadas_aplicaciones_facil: {
    title: "Aplicaciones de Derivadas - Nivel Básico",
    description:
      "Introducción a los problemas de tasa de cambio y optimización usando derivadas. Se abordan ejemplos sencillos para comprender cómo la derivada representa la variación instantánea y cómo identificar puntos críticos.",
    theory: [
      "La derivada de una función indica la tasa de cambio instantánea.",
      "Un punto crítico se obtiene cuando la derivada es cero, lo que puede corresponder a un máximo o mínimo local.",
    ],
    examples: [
      {
        problem:
          "Determina la tasa de cambio instantánea de la función \\(s(t)=4t^2\\) en \\(t=3\\).",
        steps: [
          "Calcula la derivada de la función: \\(s'(t)=8t\\).",
          "Evalúa la derivada en \\(t=3\\): \\(s'(3)=8 \\times 3 = 24\\).",
        ],
        solution:
          "La tasa de cambio en \\(t=3\\) es 24 unidades por unidad de tiempo.",
      },
      {
        problem:
          "Encuentra el máximo de la función \\(f(x) = -x^2+4x+1\\) utilizando derivadas.",
        steps: [
          "Deriva la función: \\(f'(x) = -2x+4\\).",
          "Iguala la derivada a cero para encontrar el punto crítico: \\(-2x+4=0 \\) ⟹ \\(x=2\\).",
          "Evalúa \\(f(2)\\): \\(f(2) = -4+8+1 = 5\\).",
        ],
        solution: "El máximo se da en \\(x=2\\), donde \\(f(2)=5\\).",
      },
    ],
    tips: [
      "Recuerda que la derivada representa la pendiente o la tasa de cambio instantánea.",
      "En problemas de optimización, identifica los puntos críticos derivando y luego evaluando la función.",
      "Este nivel se enfoca en casos directos y con funciones sencillas.",
    ],
  },

  derivadas_aplicaciones_medio: {
    title: "Aplicaciones de Derivadas - Nivel Intermedio",
    description:
      "Profundización en problemas de tasa de cambio y optimización, incluyendo ejemplos aplicados a contextos económicos y de ingeniería. Se introduce el análisis de funciones y la validación de puntos críticos.",
    theory: [
      "El análisis de la derivada permite identificar intervalos de crecimiento y decrecimiento de la función.",
      "En problemas de optimización, es fundamental verificar que los puntos críticos sean efectivamente máximos o mínimos mediante criterios adicionales.",
    ],
    examples: [
      {
        problem:
          "Una empresa modela la demanda de un producto con la función \\(D(p)=100-5p\\). Calcula la tasa de cambio de la demanda respecto al precio en \\(p=10\\).",
        steps: [
          "Deriva la función de demanda: \\(D'(p) = -5\\).",
          "La tasa de cambio es constante y vale -5, lo que indica que por cada aumento unitario en el precio, la demanda disminuye en 5 unidades.",
        ],
        solution:
          "La tasa de cambio de la demanda en \\(p=10\\) es -5 unidades por cada unidad de incremento en el precio.",
      },
      {
        problem:
          "Determina la cantidad de producción que maximiza la ganancia, sabiendo que el ingreso total es \\(R(x)=50x\\) y el costo total es \\(C(x)=0.5x^2+20x+100\\).",
        steps: [
          "Calcula la función ganancia: \\(G(x)=R(x)-C(x)=50x - (0.5x^2+20x+100)\\).",
          "Simplifica: \\(G(x)=-0.5x^2+30x-100\\).",
          "Deriva la función ganancia: \\(G'(x)=-x+30\\).",
          "Iguala la derivada a cero: \\(-x+30=0 \\) ⟹ \\(x=30\\).",
        ],
        solution:
          "La ganancia es máxima para una producción de \\(30\\) unidades.",
      },
    ],
    tips: [
      "Verifica el comportamiento de la función antes y después del punto crítico para confirmar si es máximo o mínimo.",
      "Presta atención a la interpretación económica o física de la tasa de cambio.",
      "Este nivel incluye ejemplos donde la derivada se utiliza en contextos reales.",
    ],
  },

  derivadas_aplicaciones_dificil: {
    title: "Aplicaciones de Derivadas - Nivel Avanzado",
    description:
      "Análisis detallado de problemas complejos de tasa de cambio y optimización. Se abordan casos con funciones implícitas, restricciones y aplicaciones en diseño de sistemas y procesos.",
    theory: [
      "La diferenciación implícita es útil para problemas donde las variables están interrelacionadas.",
      "El método de Lagrange y otros teoremas permiten resolver problemas de optimización con restricciones.",
    ],
    examples: [
      {
        problem:
          "Un tanque cilíndrico de volumen fijo \\(V=1000\\) debe diseñarse para minimizar el área de la superficie. La fórmula del área es \\(A=2\\pi r^2+2\\pi r h\\). Determina las dimensiones que minimizan \\(A\\).",
        steps: [
          "Expresa la altura \\(h\\) en función del radio \\(r\\) usando el volumen: \\(h=\\frac{V}{\\pi r^2}=\\frac{1000}{\\pi r^2}\\).",
          "Sustituye en el área: \\(A(r)=2\\pi r^2+2\\pi r \\cdot \\frac{1000}{\\pi r^2}=2\\pi r^2+\\frac{2000}{r}\\).",
          "Deriva \\(A(r)\\) respecto a \\(r\\): \\(A'(r)=4\\pi r-\\frac{2000}{r^2}\\).",
          "Iguala la derivada a cero: \\(4\\pi r-\\frac{2000}{r^2}=0 \\) ⟹ \\(4\\pi r^3=2000 \\) ⟹ \\(r^3=\\frac{500}{\\pi}\\).",
          "Calcula \\(r\\) y luego \\(h\\) utilizando la relación anterior.",
        ],
        solution:
          "Las dimensiones óptimas se obtienen al resolver \\(r=\\sqrt[3]{\\frac{500}{\\pi}}\\) y \\(h=\\frac{1000}{\\pi r^2}\\).",
      },
      {
        problem:
          "Un objeto se mueve a lo largo de una trayectoria y su posición está dada por \\(s(t)=t^3-6t^2+9t+2\\). Determina la aceleración en \\(t=4\\) para analizar la variación de la tasa de cambio.",
        steps: [
          "Deriva la función para obtener la velocidad: \\(s'(t)=3t^2-12t+9\\).",
          "Deriva nuevamente para obtener la aceleración: \\(s''(t)=6t-12\\).",
          "Evalúa la aceleración en \\(t=4\\): \\(s''(4)=6\\times4-12=12\\).",
        ],
        solution:
          "La aceleración en \\(t=4\\) es de 12 unidades de aceleración.",
      },
    ],
    tips: [
      "En problemas avanzados, es común utilizar la diferenciación implícita o métodos de optimización con restricciones.",
      "Comprueba siempre el comportamiento de la función mediante el análisis de la segunda derivada u otros criterios.",
      "Este nivel está orientado a aplicaciones complejas y a la integración de múltiples técnicas de derivación y optimización.",
    ],
  },

  //INTEGRALES
  integrales_indefinidas_facil: {
    title: "Fundamentos de Integración Indefinida - Nivel Básico",
    description:
      "Introducción al concepto de antiderivada y a las reglas básicas de integración, como \\(∫xⁿ dx\\) y \\(∫eˣ dx\\).",
    theory: [
      "La antiderivada de una función es aquella función cuya derivada es la función original.",
      "La regla de potencias establece: \\(∫xⁿ dx = x^(n+1)/(n+1) + C\\) para n ≠ -1.",
      "La integral de \\(eˣ\\) es \\(eˣ + C\\).",
    ],
    examples: [
      {
        problem: "Calcula la integral: \\(∫x dx\\)",
        steps: [
          "Identifica que la función es x, donde n = 1.",
          "Aplica la regla: \\(∫x dx = x^(1+1)/(1+1) = x²/2\\).",
          "No olvides sumar la constante de integración: C.",
        ],
        solution: "\\(x²/2 + C\\)",
      },
      {
        problem: "Calcula la integral: \\(∫eˣ dx\\)",
        steps: [
          "Reconoce que la integral de \\(eˣ\\) es la misma función.",
          "Por lo tanto, \\(∫eˣ dx = eˣ + C\\).",
        ],
        solution: "\\(eˣ + C\\)",
      },
    ],
    tips: [
      "Recuerda que siempre se debe agregar la constante de integración \\(C\\).",
      "Verifica que se cumpla la condición n ≠ -1 al aplicar la regla de potencias.",
    ],
  },
  integrales_indefinidas_medio: {
    title: "Fundamentos de Integración Indefinida - Nivel Intermedio",
    description:
      "Profundización en la integración indefinida, aplicando las reglas básicas a polinomios y combinando términos.",
    theory: [
      "La integral de una suma es la suma de las integrales: \\(∫[f(x) + g(x)] dx = ∫f(x) dx + ∫g(x) dx\\).",
      "Se puede aplicar la regla de potencias término a término en polinomios.",
    ],
    examples: [
      {
        problem: "Calcula la integral: \\(∫(3x² + 2x + 1) dx\\)",
        steps: [
          "Integra cada término por separado:",
          "• Para \\(3x²\\): \\(∫3x² dx = 3*(x^(2+1))/(2+1) = x³\\).",
          "• Para \\(2x\\): \\(∫2x dx = 2*(x^(1+1))/(1+1) = x²\\).",
          "• Para \\(1\\): \\(∫1 dx = x\\).",
          "Combina los resultados y añade \\(+ C\\).",
        ],
        solution: "\\(x³ + x² + x + C\\)",
      },
      {
        problem: "Calcula la integral: \\(∫(x + eˣ) dx\\)",
        steps: [
          "Separa la integral en dos partes:",
          "• \\(∫x dx = x²/2\\) utilizando la regla de potencias.",
          "• \\(∫eˣ dx = eˣ\\).",
          "Combina y agrega la constante de integración.",
        ],
        solution: "\\(x²/2 + eˣ + C\\)",
      },
    ],
    tips: [
      "Descompón la integral de sumas en integrales individuales.",
      "Aplica la regla de potencias en cada término del polinomio.",
    ],
  },
  integrales_indefinidas_dificil: {
    title: "Fundamentos de Integración Indefinida - Nivel Avanzado",
    description:
      "Análisis detallado de integrales que requieren un manejo preciso de las reglas de integración, incluyendo exponentes negativos.",
    theory: [
      "La regla de potencias se extiende a exponentes negativos, siempre que n ≠ -1.",
      "Para funciones con exponentes negativos: \\(∫xⁿ dx = x^(n+1)/(n+1) + C\\) se debe tener cuidado con el dominio.",
    ],
    examples: [
      {
        problem: "Calcula la integral: \\(∫x^(-2) dx\\)",
        steps: [
          "Identifica que n = -2.",
          "Aplica la regla de potencias: \\(∫x^(-2) dx = x^(-2+1)/(-2+1) = x^(-1)/(-1)\\).",
          "Simplifica el resultado y añade \\(+ C\\).",
        ],
        solution: "\\(-1/x + C\\)",
      },
      {
        problem: "Calcula la integral: \\(∫(2x^3 + eˣ) dx\\)",
        steps: [
          "Separa la integral en dos partes:",
          "• Para \\(2x^3\\): \\(∫2x³ dx = 2*(x^(3+1))/(3+1) = x⁴/2\\).",
          "• Para \\(eˣ\\): \\(∫eˣ dx = eˣ\\).",
          "Combina ambos resultados y agrega \\(+ C\\).",
        ],
        solution: "\\(x⁴/2 + eˣ + C\\)",
      },
    ],
    tips: [
      "Atención con los exponentes negativos, ya que modifican el signo del resultado.",
      "Comprueba que en cada paso se respete la regla de integración para potencias.",
    ],
  },
  integrales_tecnicas_facil: {
    title: "Técnicas de Integración Indefinida - Nivel Básico",
    description:
      "Introducción a la técnica de sustitución simple para simplificar integrales.",
    theory: [
      "La sustitución simple consiste en elegir una variable auxiliar para transformar la integral.",
      "Se define \\(u = g(x)\\) y se utiliza \\(du = g'(x) dx\\) para sustituir en la integral.",
    ],
    examples: [
      {
        problem: "Resuelve la integral: \\(∫2x dx\\)",
        steps: [
          "Elige \\(u = x^2\\), lo que implica que \\(du = 2x dx\\).",
          "Sustituye en la integral para obtener \\(∫du\\).",
          "Integra: \\(∫du = u + C\\) y vuelve a la variable original.",
        ],
        solution: "\\(x^2 + C\\)",
      },
      {
        problem: "Calcula la integral: \\(∫cos(x) sin(x) dx\\)",
        steps: [
          "Selecciona \\(u = cos(x)\\), de modo que \\(du = -sin(x) dx\\).",
          "Reescribe la integral como \\(-∫u du\\).",
          "Integra para obtener \\(-1/2 u^2 + C\\) y sustituye \\(u = cos(x)\\).",
        ],
        solution: "\\(-1/2 cos^2(x) + C\\)",
      },
    ],
    tips: [
      "Escoge una sustitución que simplifique la integral.",
      "Comprueba que la derivada de la sustitución se encuentre en la integral original.",
    ],
  },

  // INTEGRALES – Técnicas de Integración Indefinida - Nivel Intermedio
  integrales_tecnicas_medio: {
    title: "Técnicas de Integración Indefinida - Nivel Intermedio",
    description:
      "Profundización en la sustitución simple y aplicación de la técnica de integración por partes.",
    theory: [
      "La integración por partes se basa en la fórmula derivada del producto: \\(∫u dv = uv - ∫v du\\).",
      "Es especialmente útil cuando la integral involucra el producto de dos funciones.",
    ],
    examples: [
      {
        problem: "Resuelve la integral: \\(∫x e^x dx\\)",
        steps: [
          "Elige \\(u = x\\) y \\(dv = e^x dx\\).",
          "Calcula \\(du = dx\\) y \\(v = e^x\\).",
          "Aplica la fórmula: \\(x e^x - ∫e^x dx\\).",
          "Integra \\(∫e^x dx = e^x + C\\) para obtener la solución final.",
        ],
        solution: "\\(x e^x - e^x + C\\)",
      },
    ],
    tips: [
      "Determina \\(u\\) como la función que se simplifica al derivar.",
      "Asegúrate de calcular correctamente \\(du\\) y \\(v\\) para aplicar la fórmula.",
    ],
  },

  // INTEGRALES – Técnicas de Integración Indefinida - Nivel Avanzado
  integrales_tecnicas_dificil: {
    title: "Técnicas de Integración Indefinida - Nivel Avanzado",
    description:
      "Análisis avanzado combinando técnicas de integración, aplicando integración por partes de forma repetida o en conjunto con sustitución.",
    theory: [
      "En integrales complejas puede ser necesario aplicar integración por partes múltiples veces o combinarla con sustitución simple.",
      "Un análisis paso a paso ayuda a identificar la estrategia óptima para simplificar la integral.",
    ],
    examples: [
      {
        problem: "Resuelve la integral: \\(∫x^2 e^x dx\\)",
        steps: [
          "Primera integración por partes: elige \\(u = x^2\\) y \\(dv = e^x dx\\), obteniendo \\(du = 2x dx\\) y \\(v = e^x\\).",
          "La integral se transforma en \\(x^2 e^x - ∫2x e^x dx\\).",
          "Aplica nuevamente integración por partes en \\(∫2x e^x dx\\): escoge \\(u = 2x\\) y \\(dv = e^x dx\\), de donde \\(du = 2 dx\\) y \\(v = e^x\\).",
          "Obtén \\(∫2x e^x dx = 2x e^x - ∫2 e^x dx = 2x e^x - 2e^x\\).",
          "Sustituye para lograr la solución final: \\(x^2 e^x - 2x e^x + 2e^x + C\\).",
        ],
        solution: "\\(e^x(x^2 - 2x + 2) + C\\)",
      },
      {
        problem: "Calcula la integral: \\(∫(ln(x))/x dx\\)",
        steps: [
          "Utiliza sustitución simple: define \\(u = ln(x)\\) lo que implica que \\(du = (1/x) dx\\).",
          "La integral se convierte en \\(∫u du\\).",
          "Integra para obtener \\(1/2 u^2 + C\\) y vuelve a sustituir \\(u = ln(x)\\).",
        ],
        solution: "\\(1/2 (ln(x))^2 + C\\)",
      },
    ],
    tips: [
      "Verifica cada paso, especialmente cuando se aplican métodos combinados.",
      "Analiza la integral para decidir si es conveniente repetir integración por partes o combinar métodos.",
    ],
  },
  integrales_definidas_facil: {
    title: "Integrales Definidas - Nivel Básico",
    description:
      "Introducción a las integrales definidas y aplicación básica del Teorema Fundamental del Cálculo para determinar áreas bajo curvas simples.",
    theory: [
      "La integral definida representa el área bajo la curva de una función en un intervalo dado.",
      "El Teorema Fundamental del Cálculo conecta la derivación con la integración, permitiendo calcular áreas mediante la antiderivada.",
    ],
    examples: [
      {
        problem:
          "Calcula el área bajo la curva de f(x) = x en el intervalo [0, 1].",
        steps: [
          "Determina la antiderivada de f(x) = x, que es \\(x^2/2\\).",
          "Evalúa la antiderivada en los límites: \\((1^2/2) - (0^2/2)\\).",
          "El resultado es 1/2, que representa el área bajo la curva.",
        ],
        solution: "Área = 1/2",
      },
      {
        problem:
          "Calcula la integral definida de f(x) = 3 en el intervalo [2, 5].",
        steps: [
          "La antiderivada de f(x) = 3 es \\(3x\\).",
          "Evalúa en los extremos: \\(3(5) - 3(2)\\) = 15 - 6.",
          "El resultado es 9.",
        ],
        solution: "Área = 9",
      },
    ],
    tips: [
      "Identifica claramente la función y el intervalo de integración.",
      "Recuerda que la antiderivada es la clave para aplicar el Teorema Fundamental del Cálculo.",
    ],
  },
  integrales_definidas_medio: {
    title: "Integrales Definidas - Nivel Intermedio",
    description:
      "Aplicación del Teorema Fundamental del Cálculo para resolver integrales definidas de funciones polinómicas y comprender el cálculo de áreas.",
    theory: [
      "Para funciones polinómicas, la antiderivada se obtiene aumentando el exponente en uno y dividiendo por el nuevo exponente.",
      "El cálculo del área consiste en evaluar la diferencia entre el valor de la antiderivada en el límite superior e inferior.",
    ],
    examples: [
      {
        problem: "Evalúa la integral de f(x) = 2x en el intervalo [1, 3].",
        steps: [
          "La antiderivada de f(x) = 2x es \\(x^2\\).",
          "Evalúa: \\(3^2 - 1^2\\) = (9 - 1).",
          "El resultado es 8.",
        ],
        solution: "Área = 8",
      },
      {
        problem: "Calcula la integral definida de f(x) = x² en [0, 2].",
        steps: [
          "Encuentra la antiderivada: \\(x^3/3\\).",
          "Evalúa: \\((2^3/3) - (0^3/3)\\) = (8/3).",
          "El área bajo la curva es 8/3.",
        ],
        solution: "Área = 8/3",
      },
    ],
    tips: [
      "Verifica cada paso al calcular la antiderivada, especialmente con exponentes.",
      "Asegúrate de aplicar correctamente los límites de integración en la evaluación.",
    ],
  },
  integrales_definidas_dificil: {
    title: "Integrales Definidas - Nivel Avanzado",
    description:
      "Análisis detallado del Teorema Fundamental del Cálculo, técnicas de integración y aplicación en el cálculo de áreas entre curvas.",
    theory: [
      "Las integrales definidas pueden requerir técnicas avanzadas como el cambio de variable o integración por partes.",
      "El Teorema Fundamental del Cálculo garantiza que, para funciones continuas, la integral definida se puede calcular a partir de su antiderivada.",
      "El área entre dos curvas se obtiene integrando la diferencia de las funciones en el intervalo de intersección.",
    ],
    examples: [
      {
        problem:
          "Determina el área bajo la curva de f(x) = 3x² en el intervalo [0, 2].",
        steps: [
          "Calcula la antiderivada: \\(x^3\\).",
          "Evalúa la antiderivada en los extremos: \\(2^3 - 0^3\\) = 8.",
          "El área bajo la curva es 8.",
        ],
        solution: "Área = 8",
      },
      {
        problem:
          "Calcula el área encerrada entre las curvas f(x) = x y g(x) = x² en el intervalo [0, 1].",
        steps: [
          "Determina la función que representa el área entre curvas: f(x) - g(x) = x - x².",
          "Encuentra la antiderivada: \\(x^2/2 - x^3/3\\).",
          "Evalúa de 0 a 1: \\((1/2 - 1/3) - (0 - 0)\\) = \\(1/6\\).",
          "El área encerrada es 1/6.",
        ],
        solution: "Área = 1/6",
      },
    ],
    tips: [
      "Revisa la continuidad de las funciones involucradas y asegúrate de identificar correctamente el área a calcular.",
      "En problemas con áreas entre curvas, determina qué función se encuentra por encima en el intervalo de integración.",
    ],
  },
  integrales_aplicaciones_facil: {
    title: "Aplicaciones Geométricas e Integrales Especiales - Nivel Básico",
    description:
      "Introducción al cálculo del área entre dos curvas mediante integración.",
    theory: [
      "El área entre dos curvas se obtiene integrando la diferencia entre la función superior y la inferior.",
      "La integral definida representa el área acumulada bajo la curva.",
    ],
    examples: [
      {
        problem:
          "Calcula el área encerrada entre las curvas \\(y = x\\) y \\(y = x^2\\).",
        steps: [
          "Determina los puntos de intersección resolviendo \\(x = x^2\\), lo que da x = 0 y x = 1.",
          "Identifica que en el intervalo [0,1] la función \\(y = x\\) está por encima de \\(y = x^2\\).",
          "Configura la integral: \\(Área = ∫₀¹ (x - x^2) dx\\).",
          "Evalúa la integral: \\(Área = [x²/2 - x³/3]_₀¹ = 1/2 - 1/3 = 1/6\\).",
        ],
        solution: "Área = 1/6",
      },
    ],
    tips: [
      "Dibuja las curvas para visualizar cuál función es mayor en el intervalo de interés.",
      "Verifica los puntos de intersección antes de configurar la integral.",
    ],
  },
  integrales_aplicaciones_medio: {
    title:
      "Aplicaciones Geométricas e Integrales Especiales - Nivel Intermedio",
    description:
      "Cálculo del volumen de sólidos de revolución utilizando el método de discos.",
    theory: [
      "El volumen de un sólido de revolución se obtiene integrando las áreas de discos o anillos.",
      "El método de discos es adecuado cuando la función se gira alrededor del eje.",
    ],
    examples: [
      {
        problem:
          "Determina el volumen del sólido obtenido al girar la región limitada por la curva \\(y = sqrt(x)\\) y el eje x, en el intervalo [0,4].",
        steps: [
          "Observa que al girar la curva se generan discos cuyo radio es \\(sqrt(x)\\).",
          "La fórmula del volumen es: \\(Volumen = π ∫₀⁴ (sqrt(x))² dx\\).",
          "Simplifica la integral: ya que \\((sqrt(x))² = x\\), la integral se reduce a \\(π ∫₀⁴ x dx\\).",
          "Calcula la integral: \\(∫₀⁴ x dx = [x²/2]_₀⁴ = 16/2 = 8\\).",
          "Por lo tanto, el volumen es: \\(Volumen = 8π\\).",
        ],
        solution: "Volumen = 8π",
      },
    ],
    tips: [
      "Identifica correctamente el radio de los discos en la región a girar.",
      "Verifica la simplificación de la función antes de integrar.",
    ],
  },
  integrales_aplicaciones_dificil: {
    title: "Aplicaciones Geométricas e Integrales Especiales - Nivel Avanzado",
    description:
      "Evaluación de integrales impropias que involucran límites infinitos.",
    theory: [
      "Una integral impropia se evalúa mediante la sustitución del infinito por un límite.",
      "La convergencia de la integral se determina evaluando el límite resultante.",
    ],
    examples: [
      {
        problem: "Evalúa la integral impropia \\(∫₁^∞ 1/x² dx\\).",
        steps: [
          "Reemplaza el infinito por un límite: considera \\(∫₁ᵇ 1/x² dx\\) y evalúa el límite cuando b → ∞.",
          "Calcula la integral: \\(∫ 1/x² dx = -1/x\\), por lo que \\(∫₁ᵇ 1/x² dx = (-1/b) - (-1/1) = 1 - 1/b\\).",
          "Toma el límite: cuando b → ∞, \\(1/b → 0\\), obteniéndose 1 - 0 = 1.",
        ],
        solution: "Resultado = 1",
      },
    ],
    tips: [
      "Utiliza límites para transformar la integral impropia en una integral definida.",
      "Verifica la convergencia de la integral antes de evaluar el límite.",
    ],
  },
};
