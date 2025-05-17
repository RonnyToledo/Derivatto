import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Text,
  useWindowDimensions,
  Animated,
  Easing,
} from "react-native";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useRouter, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "@/components/auth/AuthContext";
import StackComponent from "@/components/StackComponent/StackComponent";
import ProgressLevel, {
  Vidas,
} from "@/components/StackComponent/ProgressLevel";

// Evitar que la pantalla splash se cierre automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Quicksand: require("../assets/fonts/Quicksand-VariableFont_wght.ttf"),
  });
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  const isExRoute = segments?.[0] === "ex";
  const isUserRoute = segments?.[0] === "user";
  const isLoginRoute = segments?.[0] === "login";

  if (!loaded) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={DefaultTheme}>
        <View style={{ backgroundColor: "#F2EAE1", flex: 1 }}>
          <SafeAreaView
            style={{
              flex: 1,
              maxWidth: 400,
              width: "100%",
              marginHorizontal: "auto",
              backgroundColor: "white",
            }}
          >
            {!isExRoute && !isUserRoute && !isLoginRoute && <StackComponent />}

            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="ex/[ui]"
                options={{
                  title: "",
                  headerLeft: () => (
                    <Pressable
                      onPress={() => router.replace("/")}
                      style={{ paddingHorizontal: 10 }}
                    >
                      <ArrowLeft color="black" size={24} />
                    </Pressable>
                  ),
                  headerRight: () => <Vidas />,
                  headerTitleAlign: "center",
                  headerTitle: () => <ProgressLevel />,
                }}
              />
              <Stack.Screen
                name="user/[userProfile]"
                options={{
                  title: "",
                  headerLeft: () => (
                    <Pressable
                      onPress={() => router.push("/")}
                      style={{ margin: 6 }}
                    >
                      <ArrowLeft color="black" size={24} />
                    </Pressable>
                  ),
                }}
              />
              <Stack.Screen
                name="login/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </SafeAreaView>
        </View>
        <StatusBar animated backgroundColor="#000" />
      </ThemeProvider>
    </AuthProvider>
  );
}

interface LoadingScreenProps {
  message?: string;
  duration?: number;
  onLoadingComplete?: () => void;
}

const mathSymbols = ["∫", "∑", "π", "√", "∞", "θ", "Δ", "∂", "≈", "≠"];
const facts = [
  "El número π tiene infinitos decimales",
  "El cero fue inventado por los matemáticos indios",
  "Hay exactamente 5 sólidos platónicos",
  "La sucesión de Fibonacci aparece en la naturaleza",
  "Un googol es el número 1 seguido de 100 ceros",
  "La suma de todos los números naturales es -1/12",
  "El número áureo (φ) es aproximadamente 1.618",
  "El teorema de Pitágoras tiene más de 350 demostraciones",
];

export function LoadingScreen({
  message = "Cargando ejercicios...",
  duration = 3000,
  onLoadingComplete,
}: LoadingScreenProps) {
  const { width } = useWindowDimensions();

  const [progress, setProgress] = useState(0);
  const [currentSymbol, setCurrentSymbol] = useState(0);
  const [currentFact, setCurrentFact] = useState(
    facts[Math.floor(Math.random() * facts.length)]
  );
  const progressAnim = useRef(new Animated.Value(0)).current;
  const tickerAnim = useRef(new Animated.Value(0)).current;
  const floatingAnims = useRef(
    [...Array(6)].map(() => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    // Symbol swap
    const symbolInterval = setInterval(() => {
      setCurrentSymbol((prev) => (prev + 1) % mathSymbols.length);
    }, 200);

    // Progress animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      setProgress(100);
      if (onLoadingComplete) {
        setTimeout(onLoadingComplete, 500);
      }
    });
    const progressListener = progressAnim.addListener(({ value }) => {
      setProgress(Math.min(Math.round(value * 100), 100));
    });

    // Fact interval
    const factInterval = setInterval(() => {
      setCurrentFact(facts[Math.floor(Math.random() * facts.length)]);
    }, 2000);

    // Floating animations
    floatingAnims.forEach((anim, i) => {
      const animateParticle = () => {
        anim.x.setValue(Math.random() * 60 - 30);
        anim.y.setValue(Math.random() * 60 - 30);
        anim.opacity.setValue(0);
        anim.scale.setValue(0);

        Animated.sequence([
          Animated.parallel([
            Animated.timing(anim.x, {
              toValue: Math.random() * 120 - 60,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(anim.y, {
              toValue: Math.random() * 120 - 60,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 0.7,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(anim.scale, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(anim.opacity, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(anim.scale, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => {
          setTimeout(animateParticle, i * 400);
        });
      };
      animateParticle();
    });

    // Bottom ticker animation
    tickerAnim.setValue(0);
    Animated.loop(
      Animated.timing(tickerAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();

    return () => {
      clearInterval(symbolInterval);
      clearInterval(factInterval);
      progressAnim.removeListener(progressListener);
    };
  }, [duration, onLoadingComplete, floatingAnims, progressAnim, tickerAnim]);

  // Interpolate progress width
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  // Interpolate ticker translateX
  const tickerTranslate = tickerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [width, -width],
  });

  return (
    <View style={styles.overlay}>
      {/* Animated Symbol */}
      <View style={styles.symbolContainer}>
        <Animated.Text style={styles.symbol}>
          {mathSymbols[currentSymbol]}
        </Animated.Text>
        {floatingAnims.map((anim, i) => (
          <Animated.Text
            key={i}
            style={[
              styles.floating,
              {
                transform: [
                  { translateX: anim.x },
                  { translateY: anim.y },
                  { scale: anim.scale },
                ],
                opacity: anim.opacity,
              },
            ]}
          >
            {mathSymbols[Math.floor(Math.random() * mathSymbols.length)]}
          </Animated.Text>
        ))}
      </View>

      {/* Message */}
      <Text style={styles.message}>{message}</Text>

      {/* Fact */}
      <Text style={styles.fact}>
        <Text style={styles.factHighlight}>¿Sabías que...? </Text>
        {currentFact}
      </Text>

      {/* Progress Bar */}
      <View style={styles.progressBackground}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>
      <Text style={styles.percent}>{progress}%</Text>

      {/* Bottom ticker */}
      <Animated.View
        style={[
          styles.ticker,
          { transform: [{ translateX: tickerTranslate }] },
        ]}
      >
        <Text style={styles.tickerText}>
          {Array(10)
            .fill(
              "y = mx + b   E = mc²   a² + b² = c²   f'(x) = lim[h→0] (f(x+h) - f(x))/h"
            )
            .join("   ")}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    height: 64,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  headerItem: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 16,
  },
  progress: {
    backgroundColor: "#ffccd5",
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  symbolContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FCE4EC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  symbol: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#D81B60",
  },
  floating: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: "#F06292",
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  fact: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 24,
    width: "80%",
  },
  factHighlight: {
    color: "#D81B60",
    fontWeight: "500",
  },
  progressBackground: {
    width: "80%",
    height: 8,
    backgroundColor: "#EEE",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#D81B60",
  },
  percent: {
    fontSize: 14,
    color: "#777",
    marginBottom: 24,
  },
  ticker: {
    position: "absolute",
    bottom: 32,
  },
  tickerText: {
    fontSize: 16,
    fontFamily: "Courier",
    color: "#AAA",
  },
});
