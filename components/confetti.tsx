import React from "react";
import { View, StyleSheet } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

export default function Confetti() {
  return (
    <View style={styles.container}>
      <ConfettiCannon
        count={150}
        origin={{ x: -10, y: 0 }}
        fadeOut={true}
        fallSpeed={3000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Asegúrate de que el contenedor esté encima de todo (zIndex alto)
    zIndex: 10,
    pointerEvents: "none",
  },
});
