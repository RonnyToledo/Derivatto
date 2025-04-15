Basandote en este codigo:
import React from "react";
import { View, StyleSheet } from "react-native";
import { Platform } from "react-native";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import MathJax from "react-native-mathjax";

interface MathFormulaProps {
formula: string;
}

export default function MathFormula({ formula }: MathFormulaProps) {
if (Platform.OS === "web") {
return (

<div>
<link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
        />

        <Latex>{formula}</Latex>
      </div>
    );

} else {
// Render con KaTeX en Android/iOS
return (
<View>
<MathJax
// HTML content with MathJax support
html={formula}
// MathJax config option
mathJaxOptions={{
            messageStyle: "none",
            extensions: ["tex2jax.js"],
            jax: ["input/TeX", "output/HTML-CSS"],
            tex2jax: {
              inlineMath: [
                ["$", "$"],
                ["\\(", "\\)"],
              ],
              displayMath: [
                ["$$", "$$"],
                ["\\[", "\\]"],
              ],
              processEscapes: true,
            },
            TeX: {
              extensions: [
                "AMSmath.js",
                "AMSsymbols.js",
                "noErrors.js",
                "noUndefined.js",
              ],
            },
          }}
/>
</View>
);
}
}

function splitLatexSegments(input: string): string[] {
const regex = /\\\(.\*?\\\)/g; // Busca cualquier sección \\( ... \\) (no-greedy)
const result: string[] = [];

let lastIndex = 0;
let match: RegExpExecArray | null;

while ((match = regex.exec(input)) !== null) {
const matchStart = match.index;
const matchEnd = regex.lastIndex;

    // Si hay texto entre el final del último match y el inicio de este, se agrega como texto normal
    if (matchStart > lastIndex) {
      result.push(input.slice(lastIndex, matchStart));
    }

    // Agregamos el segmento que corresponde al LaTeX completo, incluyendo los delimitadores \\( ... \\)
    result.push(match[0]);

    // Actualizamos lastIndex al final del match actual
    lastIndex = matchEnd;

}

// Si queda texto al final (después del último match), se agrega
if (lastIndex < input.length) {
result.push(input.slice(lastIndex));
}

return result;
}

const styles = StyleSheet.create({
container: {
marginVertical: 8,
alignItems: "center",
},

webview: {
flex: 1,
backgroundColor: "transparent",
},
});
e
Puedes generar ejercicios en formato Latex con las sigueinte composicion: {
"matrices_aplicaciones_facil": [
{
"question": "Calcula el producto escalar de los vectores",
"formula": "\\vec{a} = (3, 4, 1), \\vec{b} = (2, -1, 5)",
"options": [
"\\vec{a} \\cdot \\vec{b} = 3",
"\\vec{a} \\cdot \\vec{b} = 9",
"\\vec{a} \\cdot \\vec{b} = 11",
"\\vec{a} \\cdot \\vec{b} = 13"
],
"correctAnswer": 1,
"explanation": "El producto escalar se calcula como: 3×2 + 4×(-1) + 1×5 = 6 - 4 + 5 = 7",
"difficulty": "easy",
"procedure": [
"Identificamos los componentes de cada vector: <br>\\vec{a} = (3, 4, 1) y \\vec{b} = (2, -1, 5)",
"Aplicamos la fórmula del producto escalar: <br>\\vec{a} \\cdot \\vec{b} = a_1 \\times b_1 + a_2 \\times b_2 + a_3 \\times b_3",
"Sustituimos los valores: <br>\\vec{a} \\cdot \\vec{b} = 3 \\times 2 + 4 \\times (-1) + 1 \\times 5",
"Realizamos las multiplicaciones: <br>\\vec{a} \\cdot \\vec{b} = 6 + (-4) + 5",
"Sumamos todos los términos: <br>\\vec{a} \\cdot \\vec{b} = 7"
]
},
donde para difcultad facil->easy, medio->medium, dificl->hard, y el valor de correct va entre 0-3 siendo 0 el q corresponde con answer1, 1 con answer2 y asi,dejar el orden de las respuestas correcta de forma aleatoria; ahora necesito q me hagas el json para epracticar el siguiente tema: .

Matrices
Módulo 1: Fundamentos de Matrices 1.1. ¿Qué es una matriz?
Definición, elementos (filas, columnas, orden).

Ejemplos: Matriz 2x2, 3x3.

1.2. Tipos de matrices

Matriz cuadrada, diagonal, identidad, triangular, nula.

Matriz transpuesta y simétrica.

Módulo 2: Operaciones Básicas 2.1. Suma y resta de matrices

Reglas y ejemplos prácticos.

2.2. Multiplicación por escalar

Aplicación en problemas de escalado.

2.3. Multiplicación de matrices

Regla fila-columna, propiedades (no conmutativa).

Módulo 3: Operaciones Avanzadas 3.1. Determinante

Cálculo para matrices 2x2 y 3x3 (método de Sarrus o cofactores).

Interpretación geométrica (área/volumen).

3.2. Matriz inversa

Método de Gauss-Jordan.

Condiciones para su existencia (matriz no singular).

Módulo 4: Aplicaciones 4.1. Sistemas de ecuaciones lineales

Representación matricial (Ax = b).

Método de la matriz aumentada.

4.2. Transformaciones lineales

Con dificultad facil

## Dame 30 ejercicios de esta forma
