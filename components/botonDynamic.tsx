import React, { useRef, forwardRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  ActivityIndicator,
} from "react-native";

interface PushableButtonProps {
  onPress: () => void; // ahora solo onPress
  title?: string;
  color?: string;
  darkColor?: string;
  style?: ViewStyle; // estilo del contenedor
  height?: number; // ancho y alto
  width?: number; // ancho y alto
  depression?: number; // cuánto baja al presionar
  disabled?: boolean;
  fontSize?: number;
  loading?: boolean;
}
type AnimatedViewRef = React.ComponentRef<typeof View>;

// Usamos forwardRef si queremos exponer la ref hacia afuera
const PushableButton = forwardRef<AnimatedViewRef, PushableButtonProps>(
  (
    {
      onPress,
      title = "Push me",
      color = "hsl(345,100%,47%)",
      darkColor = "hsl(340,100%,20%)",
      style,
      height = 50,
      width = 50,
      depression = 8,
      disabled = false,
      fontSize = 20,
      loading = false,
    },
    ref
  ) => {
    // Valor animado para la traslación vertical
    const translateY = useRef(new Animated.Value(-depression)).current;

    // Animamos con spring para un toque más natural
    const animateTo = (toValue: number) => {
      Animated.spring(translateY, {
        toValue,
        useNativeDriver: true,
        friction: 5,
        tension: 100,
      }).start();
    };

    const handlePressIn = () => {
      animateTo(0);
    };

    const handlePressOut = () => {
      animateTo(-depression);
    };

    const radius = (width + height) / 4;
    return (
      <View style={[styles.container]}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[
            styles.pushable,
            { backgroundColor: darkColor, width, height, borderRadius: radius },
            style,
          ]}
          disabled={disabled} // Se añade la propiedad disabled
          ref={ref} // Se pasa la referencia al componente Pressable
        >
          <Animated.View
            style={[
              [styles.front, { width, height, borderRadius: radius }, style],
              {
                transform: [
                  { translateY },
                  {
                    rotateX: translateY.interpolate({
                      inputRange: [-10, -1],
                      outputRange: ["15deg", "15deg"],
                    }),
                  },
                ],
                backgroundColor: color,
              },
            ]}
          >
            {loading && <ActivityIndicator size={20} color="#fff" />}
            <Text style={[styles.text, { fontSize: fontSize }]}>{title}</Text>
          </Animated.View>
        </Pressable>
      </View>
    );
  }
);

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
    flexDirection: "row",
    gap: 15,
    padding: 12,
    borderRadius: "50%",
    alignItems: "center",
    width: 70,
    height: 70,
    justifyContent: "center",
  },

  buttonBase: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
});

export default PushableButton;
