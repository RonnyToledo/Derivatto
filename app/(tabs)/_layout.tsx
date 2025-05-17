import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { Image, Platform, View, StyleSheet } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { AuthContext } from "@/components/auth/AuthContext";
import Home_on from "@/assets/Icons/Icons/SVG/home_on.svg";
import Home_off from "@/assets/Icons/Icons/SVG/home_off.svg";
import Learn_on from "@/assets/Icons/Icons/SVG/learn_on.svg";
import Learn_off from "@/assets/Icons/Icons/SVG/learn_off.svg";
import Rank_on from "@/assets/Icons/Icons/SVG/rank_on.svg";
import Rank_off from "@/assets/Icons/Icons/SVG/rank_off.svg";
import Profile_on from "@/assets/Icons/Icons/SVG/profile_on.svg";
import Profile_off from "@/assets/Icons/Icons/SVG/profile_off.svg";

export default function TabsLayout() {
  const { user } = useContext(AuthContext);
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Oculta el header en las pantallas con tabs
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            borderTopWidth: 0,
          },
          default: {
            elevation: 0,
            borderTopWidth: 0,
          },
        }),
      }}
    >
      {/* Pantallas dentro de los tabs */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarShowLabel: false, // <-- Oculta label
          tabBarIcon: ({ color, focused }) =>
            focused ? <Home_on /> : <Home_off />,
        }}
      />
      <Tabs.Screen
        name="learning"
        options={{
          title: "Aprendizaje",
          tabBarShowLabel: false, // <-- Oculta label
          tabBarIcon: ({ color, focused }) =>
            focused ? <Learn_on /> : <Learn_off />,
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: "Ranking",
          tabBarShowLabel: false, // <-- Oculta label
          tabBarIcon: ({ color, focused }) =>
            focused ? <Rank_on /> : <Rank_off />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarShowLabel: false, // <-- Oculta label
          tabBarIcon: ({ color, focused }) => (
            <View>
              {user?.image ? (
                focused ? (
                  <View style={[styles.avatarImage, styles.filter]}>
                    <Image
                      source={{ uri: user.image }}
                      style={StyleSheet.absoluteFill}
                    />
                  </View>
                ) : (
                  <Image
                    source={{ uri: user.image }}
                    style={styles.avatarImage}
                  />
                )
              ) : focused ? (
                <Profile_on />
              ) : (
                <Profile_off />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  avatarImage: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  filter: {
    backdropFilter: "gray(10px)",
  },
});
