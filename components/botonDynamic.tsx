import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  GestureResponderEvent,
} from "react-native";

interface PushableButtonProps {
  onPress?: () => void;
  title?: string;
  color?: string;
  darkColor?: string;
  onClick: () => void;
  heightValue?: number;
  ref?: React.RefObject<any>;
  styleObject?: object;
  radius?: object;
}

const PushableButton: React.FC<PushableButtonProps> = ({
  onPress,
  title = "Push me",
  color = "hsl(345, 100%, 47%)", // Cambiado ':' por '='
  darkColor = "hsl(340, 100%, 20%)", // Cambiado ':' por '='
  onClick,
  heightValue = -10,
  ref = null,
  styleObject,
  radius = null,
}) => {
  // Valor animado para la traslación vertical
  const translateY = useRef(new Animated.Value(heightValue)).current;
  // Almacenamos el tiempo de inicio del toque
  const pressInStartTime = useRef<number>(0);

  // Función para animar a un valor determinado en una duración específica
  const animateTo = (
    toValue: number,
    duration: number = 250,
    callback?: () => void
  ) => {
    Animated.timing(translateY, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start(() => {
      if (callback) callback(); // Ejecuta el callback al finalizar la animación
    });
  };

  const handlePressIn = (event: GestureResponderEvent) => {
    pressInStartTime.current = Date.now();
    animateTo(-1, 250, onClick); // Ejecuta onClick después de la animación
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    const elapsed = Date.now() - pressInStartTime.current;
    // Si el toque duró menos de 250ms, se espera el resto del tiempo para completar la animación
    const delay = elapsed < 250 ? 250 - elapsed : 0;
    setTimeout(() => {
      animateTo(heightValue, 250);
    }, delay);
  };

  return (
    <View style={[styles.container, styleObject]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.pushable,
          { backgroundColor: darkColor },
          styleObject,
          radius,
        ]}
        ref={ref} // Se pasa la referencia al componente Pressable
      >
        <Animated.View
          style={[
            [styles.front, styleObject, radius],
            {
              transform: [
                { translateY },
                {
                  rotateX: translateY.interpolate({
                    inputRange: [heightValue, -1],
                    outputRange: ["15deg", "15deg"],
                  }),
                },
              ],
              backgroundColor: color,
            },
          ]}
        >
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Opcional: centra el botón en la pantalla
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  pushable: {
    borderRadius: "50%",
    width: 70,
    height: 70,
    padding: 0,
  },
  front: {
    flex: 1,
    padding: 12,
    borderRadius: "50%",
    alignItems: "center",
    width: 70,
    height: 70,
    justifyContent: "center",
  },
  text: {
    fontSize: 25, // Aproximadamente 1.25rem
    color: "white",
    textAlign: "center",
    fontWeight: 700,
  },
});

export default PushableButton;
