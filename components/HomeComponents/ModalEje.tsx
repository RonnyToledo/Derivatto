import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import Popover from "react-native-popover-view";
import { useRouter } from "expo-router";
import PushableButton from "../botonDynamic";

interface PopoverExampleProps {
  ui: string;
  title: string;
  color: string;
  darkerColor: string;
  LevelName?: string | null;
  disabled?: boolean | null;
}
export default function PopoverExample({
  ui,
  title,
  color,
  darkerColor,
  LevelName,
  disabled,
}: PopoverExampleProps) {
  const router = useRouter();
  const buttonRef = useRef<any>(null); // Se utiliza para referenciar el botón
  const [showPopover, setShowPopover] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.circle} ref={buttonRef}>
        <PushableButton
          title={title}
          color={color}
          width={70}
          height={70}
          fontSize={25}
          darkColor={darkerColor}
          onPress={() => setShowPopover(true)}
        />
      </View>
      <Popover
        isVisible={showPopover}
        from={buttonRef}
        onRequestClose={() => setShowPopover(false)}
        popoverStyle={{ borderRadius: 20 }}
      >
        <View style={styles.popoverContent}>
          <Text style={[styles.popoverText, { color, fontWeight: 700 }]}>
            {LevelName}
          </Text>
          {disabled && (
            <Text style={styles.popoverText}>
              {"No tienes vidas para acceder al nivel"}
            </Text>
          )}
          <PushableButton
            title={"Ir al Nivel"}
            color={color}
            darkColor={darkerColor}
            height={50}
            width={150}
            onPress={() => {
              router.push(`/ex/${ui}`);
              setShowPopover(false);
            }}
            disabled={disabled ? true : false}
          />
        </View>
      </Popover>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  popoverContent: {
    width: 250,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  popoverText: {
    marginBottom: 20,
    fontSize: 16,
  },
  circle: {
    display: "flex",
    width: "100%",
    aspectRatio: 1,
    borderRadius: 40,
    justifyContent: "center",
    position: "relative",
  },
});
