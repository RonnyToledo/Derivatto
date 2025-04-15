import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useRouter, Stack, usePathname, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Flame, Gem, Heart, ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "@/components/auth/AuthContext";
import StackComponent from "@/components/StackComponent/StackComponent";

// Evitar que la pantalla splash se cierre automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  const isExRoute = segments[0] === "ex";
  const isUserRoute = segments[0] === "user";
  const isLoginRoute = segments[0] === "login";

  return (
    <AuthProvider>
      <ThemeProvider value={DefaultTheme}>
        <View style={{ backgroundColor: "#e9e9e9", flex: 1 }}>
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
                      onPress={() => router.push("/")}
                      style={{ margin: 6 }}
                    >
                      <ArrowLeft color="black" size={24} />
                    </Pressable>
                  ),
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    height: 64,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  headerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 16,
  },
});
