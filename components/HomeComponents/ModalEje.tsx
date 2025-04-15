import React, { useState, useRef } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import Popover from "react-native-popover-view";
import { useRouter } from "expo-router";
import PushableButton from "../botonDynamic";

interface PopoverExampleProps {
  ui: string;
  title: string;
  color: string;
  darkerColor: string;
  LevelName?: string | null;
}
export default function PopoverExample({
  ui,
  title,
  color,
  darkerColor,
  LevelName,
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
          darkColor={darkerColor}
          onClick={() => setShowPopover(true)}
        />
      </View>
      <Popover
        isVisible={showPopover}
        from={buttonRef}
        onRequestClose={() => setShowPopover(false)}
        popoverStyle={{ borderRadius: 20 }}
      >
        <View style={styles.popoverContent}>
          <Text style={styles.popoverText}>{LevelName}</Text>
          <PushableButton
            title={"Ir al Nivel"}
            color={color}
            darkColor={darkerColor}
            styleObject={{ width: "100%" }}
            radius={{ borderRadius: 20 }}
            onPress={() => setShowPopover(false)}
            onClick={() => {
              router.push(`/ex/${ui}`);
            }}
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
