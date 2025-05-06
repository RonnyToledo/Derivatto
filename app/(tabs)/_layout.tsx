import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { Image, Platform, View, StyleSheet } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { AuthContext } from "@/components/auth/AuthContext";

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
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="home"
              size={24}
              color={focused ? "orange" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="learning"
        options={{
          title: "Aprendizaje",
          tabBarShowLabel: false, // <-- Oculta label
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="book" size={24} color={focused ? "blue" : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: "Ranking",
          tabBarShowLabel: false, // <-- Oculta label
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name="trophy"
              size={24}
              color={focused ? "gold" : color}
            />
          ),
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
              ) : (
                <FontAwesome6
                  name="user-large"
                  size={24}
                  color={focused ? "brown" : color}
                />
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
