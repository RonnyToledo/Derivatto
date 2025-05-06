import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState, useRef } from "react";
import { Flame, Gem, Heart } from "lucide-react-native";
import { AuthContext } from "@/components/auth/AuthContext";
import { StyleSheet } from "react-native";
import PopoverStack from "./popoverStack";
import { LifeComponent, Shop, StreakCard } from "./componentsUp";

export default function StackComponent() {
  const { user } = useContext(AuthContext);
  const [popover, setPopover] = useState<string | null>("");
  const buttonRacha = useRef<null>(null);
  const buttonGems = useRef<null>(null);
  const buttonLifes = useRef<null>(null);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => setPopover("racha")}
        style={styles.headerItem}
        ref={buttonRacha}
      >
        <Flame color="red" size={24} fill="orange" style={styles.headerIcon} />
        <Text
          style={[
            styles.headerText,
            { fontSize: 20, color: "red", fontWeight: "500" },
          ]}
        >
          {user?.racha || 0}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        ref={buttonGems}
        onPress={() => setPopover("gemas")}
        style={styles.headerItem}
      >
        <Gem
          size={24}
          fill="#1daff6"
          color="#10879c"
          style={styles.headerIcon}
        />
        <Text
          style={[
            styles.headerText,
            { fontSize: 20, color: "#1daff6", fontWeight: "500" },
          ]}
        >
          {user?.gemas || 0}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        ref={buttonLifes}
        onPress={() => setPopover("vidas")}
        style={styles.headerItem}
      >
        <Heart size={24} fill="red" color="brown" style={styles.headerIcon} />
        <Text
          style={[
            styles.headerText,
            { fontSize: 20, color: "red", fontWeight: "500" },
          ]}
        >
          {user?.vidas || 0}
        </Text>
      </TouchableOpacity>

      <PopoverStack
        isVisible={popover === "racha"}
        ref={buttonRacha}
        onRequestClose={() => setPopover("")}
      >
        <StreakCard
          title="Racha"
          streakDays={user?.racha || 0}
          protectores={user?.proteccion || 0}
        />
      </PopoverStack>
      <PopoverStack
        isVisible={popover === "gemas"}
        ref={buttonGems}
        onRequestClose={() => setPopover("")}
      >
        <Shop />
      </PopoverStack>
      <PopoverStack
        isVisible={popover === "vidas"}
        ref={buttonLifes}
        onRequestClose={() => setPopover("")}
      >
        <LifeComponent
          onRequest={async () => {
            setPopover("");
            await new Promise((resolve) => setTimeout(resolve, 100));
            setPopover("gemas");
          }}
        />
      </PopoverStack>
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
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "90%",
    maxWidth: 350,
    height: 600,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  iconButton: { padding: 8 },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontSize: 10, fontWeight: "bold" },
  levelCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#db2777",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },
  stageText: { fontSize: 12, color: "#fff" },
  levelText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  docIcon: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 8,
  },
  levelButtonsContainer: { alignItems: "center", marginTop: 24 },
  levelButton: { width: 64, height: 64, marginVertical: 12 },
  levelButtonBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#db2777",
    borderRadius: 32,
    opacity: 0.2,
  },
  levelButtonContent: {
    flex: 1,
    backgroundColor: "#db2777",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  levelButtonText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  navButton: { alignItems: "center" },
  navText: { fontSize: 12, marginTop: 4, color: "#888" },
  navActiveText: { color: "#3b82f6" },
  panel: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  panelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  panelTitle: { fontSize: 18, fontWeight: "bold" },
  panelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  panelLabel: { fontSize: 14, color: "#4b5563" },
  panelValue: { fontSize: 14, fontWeight: "500" },
  progressBarBg: {
    width: "100%",
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    overflow: "hidden",
    marginVertical: 8,
  },
  progressBarFill: { height: 6, backgroundColor: "#ef4444", borderRadius: 3 },
  panelButton: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#ef4444",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  panelButtonText: { color: "#fff", fontWeight: "500" },
  offerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginVertical: 4,
  },
  offerIconBg: {
    width: 32,
    height: 32,
    backgroundColor: "#fee2e2",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  offerText: { flex: 1 },
  offerButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#3b82f6",
    borderRadius: 6,
  },
  offerButtonText: { color: "#fff", fontSize: 12 },
  livesIconsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  fullLivesInfo: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  fullLivesText: { fontSize: 14, color: "#4b5563" },
  fullLivesSubText: { fontSize: 12, color: "#6b7280", marginTop: 4 },
  livesButtonsRow: { flexDirection: "row", marginTop: 8 },
  buyLivesButton: { flex: 1, backgroundColor: "#3b82f6", marginRight: 4 },
  requestLivesButton: { flex: 1, backgroundColor: "#ef4444", marginLeft: 4 },
  panelButtonTextSmall: { color: "#fff", fontWeight: "500", fontSize: 12 },
});
