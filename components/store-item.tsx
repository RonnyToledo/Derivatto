import React from "react";
import type { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface StoreItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  priceType: "gem" | "real";
  icon: ReactNode;
  bgColor: string;
  discount?: string;
  popular?: boolean;
}

export default function StoreItem({
  id,
  name,
  description,
  price,
  priceType,
  icon,
  bgColor,
  discount,
  popular,
}: StoreItemProps) {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {discount && (
        <View style={styles.discountContainer}>
          <Text style={styles.discountText}>{discount}</Text>
        </View>
      )}

      {popular && (
        <View style={styles.popularContainer}>
          <Text style={styles.popularText}>
            <FontAwesome6 name="star" size={24} color="black" /> POPULAR
          </Text>
        </View>
      )}

      <View style={styles.contentRow}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>{icon}</View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{id}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        <View style={styles.actionContainer}>
          <View style={styles.priceContainer}>
            {priceType === "gem" ? (
              <>
                <FontAwesome6 name="gem" size={24} color="black" />
                <Text style={styles.priceText}>{price}</Text>
              </>
            ) : (
              <>
                <FontAwesome6 name="dollar-sign" size={24} color="black" />
                <Text style={styles.priceText}>{price}</Text>
              </>
            )}
          </View>
          <Text style={styles.buyText}>Comprar</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombra para Android
    elevation: 5,
    position: "relative",
    overflow: "hidden",
  },
  discountContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  discountText: {
    fontWeight: "bold",
  },
  popularContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  popularText: {
    backgroundColor: "#F59E0B", // amber-500
    fontWeight: "bold",
    padding: 4,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  iconContainer: {
    position: "relative",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
  },
  badge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#DB2777", // pink-600
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#F9A8D4", // pink-300
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  descriptionText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
  actionContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },
  priceText: {
    fontWeight: "bold",
    marginLeft: 4,
  },
  buyText: {
    backgroundColor: "#fff",
    color: "#4C1D95", // purple-900
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
