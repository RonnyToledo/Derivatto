import React from "react";
import { Platform } from "react-native";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";

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
      <MathJaxSvg fontSize={16} color="#000000" fontCache={true}>
        {formula}
      </MathJaxSvg>
    );
  }
}
