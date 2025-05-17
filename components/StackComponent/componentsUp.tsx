import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { AuthContext } from "../auth/AuthContext";
import { startMinuteCountdown } from "@/functions/startMinuteCountdown";
import Streak_freeze from "@/assets/Icons/Icons/SVG/streak_freeze.svg";
import Heart from "@/assets/Icons/Icons/SVG/heart.svg";
import Heart_empty from "@/assets/Icons/Icons/SVG/heart_empty.svg";
import Emerald from "@/assets/Icons/Icons/SVG/emerald.svg";

export function LifeComponent({ onRequest }: { onRequest: () => void }) {
  const { user } = useContext(AuthContext);
  const [mins, setMins] = useState<number>(0);

  useEffect(() => {
    const handle = startMinuteCountdown(
      user?.last_vida || new Date().toISOString(),
      (remaining) => setMins(remaining),
      () => console.log("¡Se cumplieron los 30 minutos!")
    );
    return () => clearInterval(handle);
  }, [user?.last_vida]);

  return (
    <Animated.View style={[styles.container]}>
      <View style={styles.heartsRow}>
        {Array.from({ length: 5 }).map((_, i) =>
          i + 1 <= (user?.vidas || 0) ? (
            <Heart style={{ marginHorizontal: 4, width: 40, height: 40 }} />
          ) : (
            <Heart_empty
              style={{ marginHorizontal: 4, width: 40, height: 40 }}
            />
          )
        )}
      </View>

      <Text style={styles.fullText}>
        {(user?.vidas || 0) === 5
          ? "Tu set de vidas está completo"
          : "Tu set de vidas está incompleto"}
      </Text>
      <Text style={styles.subText}>
        {(user?.vidas || 0) === 5
          ? "Ya puedes seguir aprendiendo"
          : `Quedan ${mins} minutos para que se recarguen tus vidas`}
      </Text>

      <View style={styles.options}>
        {/* VIDAS ILIMITADAS 
        <TouchableOpacity style={styles.optionButton}>
          <View style={styles.optionLeft}>
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              style={{ marginRight: 8 }}
            >
              <Defs>
                <LinearGradient
                  id="heartGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="#00E99D" />
                  <Stop offset="100%" stopColor="#9747FF" />
                </LinearGradient>
              </Defs>
              <Path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                     2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                     C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 
                     22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="url(#heartGradient)"
              />
              <SvgText
                x="12"
                y="12"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="10"
                fontWeight="bold"
                fill="#fff"
              >
                ∞
              </SvgText>
            </Svg>
            <Text style={styles.optionTextBold}>VIDAS ILIMITADAS</Text>
          </View>
          <Text style={styles.optionTextAccent}>PRUÉBALO GRATIS</Text>
        </TouchableOpacity> 
        */}

        {/* RECUPERA TUS VIDAS */}
        <TouchableOpacity style={styles.optionButton} onPress={onRequest}>
          <View style={styles.optionLeft}>
            <Heart
              color="#FF4B4B"
              style={{ marginRight: 8, width: 40, height: 40 }}
            />
            <Text style={styles.optionTextBold}>RECUPERA TUS VIDAS</Text>
          </View>
        </TouchableOpacity>

        {/* PRACTICA PARA GANAR VIDAS 
        <TouchableOpacity style={styles.optionButton}>
          <View style={styles.optionLeft}>
            <FontAwesome
              name="heart-o"
              size={24}
              color="red"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.optionTextBold}>PRACTICA PARA GANAR VIDAS</Text>
          </View>
        </TouchableOpacity>
        */}
      </View>
    </Animated.View>
  );
}

export const Shop: React.FC = () => {
  const { user, Compra } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Sección Vidas */}
        <Text style={styles.title}>Vidas</Text>

        {/* Opción: Recupera tus vidas */}
        <View style={styles.item}>
          <View style={styles.iconContainer}>
            <Heart style={{ padding: 5 }} width={40} height={40} />
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Recupera tus vidas</Text>
            <Text style={styles.itemDescription}>
              Recarga tu set de vidas completo y aumenta las posibilidades de
              terminar una lección.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.buttonWithIcon}
            disabled={loading || (user?.vidas || 0) > 0}
            onPress={async () => {
              setLoading(true);
              if ((user?.gemas || 0) > 200) {
                console.log("Compra vidas", user?.id || "");

                const data = await Compra(
                  user?.id || "",
                  (user?.gemas || 0) - 50,
                  user?.proteccion || 0,
                  (user?.vidas || 0) + 5
                );
                console.log(data);
              } else {
                console.error("No tienes suficientes gemas para comprar vidas");
                alert("No tienes suficientes gemas para comprar vidas");
              }
              setLoading(false);
            }}
          >
            <Emerald style={styles.gems} />
            <Text style={styles.priceText}>200</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <View style={[styles.iconContainer, { flex: 1 }]}>
            <Heart style={{ padding: 5 }} width={40} height={40} />
          </View>
          <View style={[styles.itemText, { flex: 3 }]}>
            <Text style={styles.itemTitle}>Recupera 1 vida</Text>
            <Text style={styles.itemDescription}>
              Recarga de vida mas economica para que puedas seguir aprendiendo.
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.buttonWithIcon, { flex: 1 }]}
            disabled={loading || user?.vidas === 5}
            onPress={async () => {
              setLoading(true);
              if ((user?.gemas || 0) > 50) {
                console.log("Compra vidas", user?.id || "");

                const data = await Compra(
                  user?.id || "",
                  (user?.gemas || 0) - 50,
                  user?.proteccion || 0,
                  (user?.vidas || 0) + 1
                );
                console.log(data);
              } else {
                console.error("No tienes suficientes gemas para comprar vidas");
                alert("No tienes suficientes gemas para comprar vidas");
              }
              setLoading(false);
            }}
          >
            <Emerald style={styles.gems} />

            <Text style={styles.priceText}>50</Text>
          </TouchableOpacity>
        </View>

        {/* Opción: Vidas ilimitadas 
        <View style={styles.item}>
          <View style={styles.iconContainer}>
            <Svg width={60} height={60} viewBox="0 0 60 60">
              <Defs>
                <LinearGradient
                  id="heartGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="#00E99D" />
                  <Stop offset="100%" stopColor="#9747FF" />
                </LinearGradient>
              </Defs>
              <Path
                d="M30 50.35L25.45 46.32C13.4 35.36 5 28.28 5 19.5C5 12.42 10.42 7 17.5 7C21.74 7 25.91 9.31 30 13.09C34.09 9.31 38.26 7 42.5 7C49.58 7 55 12.42 55 19.5C55 28.28 46.6 35.36 34.55 46.32L30 50.35Z"
                fill="url(#heartGradient)"
              />
              <SvgText
                x="30"
                y="30"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize={24}
                fontWeight="bold"
                fill="white"
              >
                ∞
              </SvgText>
            </Svg>
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>Vidas ilimitadas</Text>
            <Text style={styles.itemDescription}>
              ¡Con Súper no te quedarás sin vidas!
            </Text>
          </View>
          <TouchableOpacity style={styles.buttonOutline}>
            <Text style={styles.buttonOutlineText}>PRUÉBALO GRATIS</Text>
          </TouchableOpacity>
        </View>*/}

        {/* Sección Potenciadores */}
        <Text style={[styles.title, { marginTop: 32 }]}>Potenciadores</Text>

        <View style={styles.item}>
          <View style={[styles.iconContainer, { flex: 1 }]}>
            <Streak_freeze width={50} height={50} />
          </View>
          <View style={[styles.itemText, { flex: 3 }]}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {user?.proteccion || 0}/2 EQUIPADO
              </Text>
            </View>
            <Text style={styles.itemTitle}>Protector de racha</Text>
            <Text style={styles.itemDescription}>
              Te permite mantener tu racha cuando no usas la app por un día.
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.buttonWithIcon, { flex: 1 }]}
            disabled={loading || (user?.proteccion || 0) >= 2}
            onPress={async () => {
              setLoading(true);
              if ((user?.gemas || 0) > 250) {
                const data = await Compra(
                  user?.id || "",
                  (user?.gemas || 0) - 250,
                  (user?.proteccion || 0) + 1,
                  user?.vidas || 0
                );
                console.log(data);
              } else {
                console.error("No tienes suficientes gemas para comprar vidas");
                alert("No tienes suficientes gemas para comprar vidas");
              }
              setLoading(false);
            }}
          >
            <Emerald style={styles.gems} />
            <Text style={styles.priceText}>250</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

interface StreakCardProps {
  streakDays: number;
  protectores: number;
}

export const DropletIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C12 2 7 7.523 7 12.5C7 16.642 10.358 20 14.5 20C18.642 20 22 16.642 22 12.5C22 7.523 17 2 17 2H12Z"
      fill="#ccc"
    />
    <Path
      d="M12 2S7 7.523 7 12.5C7 16.642 10.358 20 14.5 20"
      stroke="#999"
      strokeWidth={1.5}
    />
  </Svg>
);

export const StreakCard: React.FC<StreakCardProps> = ({
  streakDays,
  protectores,
}) => {
  return (
    <View style={styles.card}>
      {/* Streak count */}
      <View style={styles.streakSection}>
        <Text
          style={styles.streakTextGray}
        >{`${streakDays} días de racha`}</Text>
        <Text style={styles.streakTextWhite}>
          ¡Completa una lección hoy y extiende tu racha!
        </Text>
      </View>

      {/* Friends section */}
      <View style={styles.friendsSection}>
        <View
          style={[
            styles.friendsHeader,
            styles.row,
            {
              alignItems: "center",
              justifyContent: "space-around",
            },
          ]}
        >
          <View style={[styles.friendsIconWrapper, { flex: 2 }]}>
            <View style={styles.flameCircle}>
              <Streak_freeze />
            </View>
          </View>
          <View style={[styles.friendsInfo, { flex: 7 }]}>
            <View>
              <Text style={styles.friendsTitle}>Protectores de Racha</Text>
              <Text
                style={styles.friendsSubtitle}
              >{`${protectores} Protectores de racha disponibles`}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progress: {
    backgroundColor: "#ffccd5",
    borderRadius: 8,
    width: 300,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerBadge: {
    borderRadius: 12,
    padding: 8,
  },
  headerBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    lineHeight: 16,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    opacity: 0.7,
    padding: "auto",
  },
  streakSection: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  streakTextGray: {
    fontSize: 20,
    color: "#FF981C",
    fontWeight: "500",
  },
  streakTextWhite: {
    marginTop: 8,
    fontSize: 16,

    fontWeight: "500",
  },
  gems: {
    width: 15,
    height: 15,
    paddingHorizontal: 7,
  },
  weeklySection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dayDefault: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
    width: 32,
  },
  dayCurrent: {
    color: "#facc15",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    width: 32,
  },
  progressBackground: {
    width: "100%",
    height: 16,
    backgroundColor: "#374151",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: 16,
    backgroundColor: "#6b7280",
    position: "relative",
  },
  progressIndicator: {
    position: "absolute",
    left: 0,
    width: "100%",
    height: 16,
    borderRadius: 8,
    backgroundColor: "#facc15",
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorIcon: {
    fontSize: 10,
    fontWeight: "bold",
  },
  friendsSection: {
    backgroundColor: "#A7EEFF",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  friendsHeader: {},
  friendsInfo: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  friendsIconWrapper: {
    position: "relative",
    marginRight: 12,
  },
  flameCircle: {
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  statusDot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "#ff4b00",
    bottom: -4,
    right: -4,
  },
  friendsTitle: {
    fontSize: 16,
    color: "#45B4CE",
    fontWeight: "bold",
  },
  friendsSubtitle: {
    fontSize: 12,

    color: "#45B4CE",
    marginTop: 4,
  },
  friendsButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  friendsButtonText: {
    color: "#ff4b00",
    fontSize: 16,
    fontWeight: "bold",
  },

  container: {},
  content: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  itemText: { flex: 1, padding: 5 },
  itemTitle: { fontWeight: "bold", fontSize: 16 },
  itemDescription: { fontSize: 12, color: "#686868" },
  buttonFilled: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonFilledText: { fontSize: 12 },
  buttonOutline: {
    borderWidth: 1,
    borderColor: "#9747FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonOutlineText: { color: "#9747FF", fontSize: 12 },
  tag: {
    backgroundColor: "#A7EEFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  tagText: { fontSize: 10 },
  buttonWithIcon: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFB580",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    justifyContent: "center",
  },
  buttonWithIconText: { fontSize: 12 },
  priceText: { color: "#87A629", fontWeight: "bold" },

  popoverWrapper: {
    borderRadius: 12,
    padding: 0,
  },

  heartsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  fullText: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: "#505050",
    textAlign: "center",
    marginBottom: 16,
  },
  options: {
    marginTop: 8,
  },
  optionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFEEE9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionTextBold: {
    fontWeight: "700",
    fontSize: 14,
  },
  optionTextAccent: {
    color: "#9b59b6",
    fontWeight: "700",
    fontSize: 14,
  },
  optionValue: {
    fontWeight: "500",
    marginLeft: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },

  footer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    paddingTop: 8,
  },
  protectorButton: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#ff4b4b",
    borderRadius: 6,
    alignItems: "center",
  },
  protectorButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
