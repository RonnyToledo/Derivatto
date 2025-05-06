import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React, { useState, useCallback, useContext } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ejercicioFinish } from "@/assets/exe";
import { darkenColor } from "@/functions/tinycolors";
import { useRouter } from "expo-router";
import PopoverExample from "./ModalEje";
import { transformLevel } from "@/functions/transformLevel";
import { AuthContext } from "../auth/AuthContext";

function transformToSections() {
  return ejercicioFinish.map((sectionObj) => ({
    id: sectionObj.id,
    title: sectionObj.title,
    color: sectionObj.color,
    // data será un array de tuplas: [ 'limites_sustitucion_directa-1', arrayDeEjercicios ]
    data: Object.entries(sectionObj.ej),
  }));
}
interface Section {
  detectPorCent: (
    index: number,
    totalItems: number,
    maxTranslate?: number
  ) => number;
}
export default function SectionListComp({ detectPorCent }: Section) {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    router.reload();
    setTimeout(() => setRefreshing(false), 800);
  }, [router]);

  return (
    <SectionList
      sections={transformToSections()}
      keyExtractor={([key], index) => key + index}
      stickySectionHeadersEnabled={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item, index, section }) => {
        const [key] = item;
        const color = (user?.vidas || 0) > 0 ? section.color : "gray";

        const darkerColor = darkenColor(color, 15);
        const valueTranslate = detectPorCent(index, section.data.length);
        return (
          <View style={styles.cardContentScroll}>
            <View
              style={[
                styles.circleContainer,
                {
                  transform: [
                    {
                      translateX: valueTranslate,
                    },
                  ],
                },
              ]}
            >
              <PopoverExample
                LevelName={transformLevel(key)}
                ui={key}
                title={String(index + 1)}
                color={color}
                darkerColor={darkerColor}
                disabled={(user?.vidas || 0) === 0}
              />
            </View>
          </View>
        );
      }}
      renderSectionHeader={({ section }) => (
        <View style={styles.header}>
          <View
            style={[
              styles.cardHeader,
              {
                backgroundColor:
                  (user?.vidas || 0) > 0 ? section.color : "gray",
              },
              styles.shadowStyle,
            ]}
          >
            <View style={styles.cardHeaderTextContainer}>
              <Text style={styles.stageText}>
                Estapa {Number(section.id) + 1}
              </Text>
              <Text style={styles.titleText}>{section.title}</Text>
            </View>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() =>
                router.push(`/learning?topic=${section.title.toLowerCase()}`)
              }
            >
              <FontAwesome name="book" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: { padding: 4, backgroundColor: "#f2f2f2" },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  ///
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  mainScroll: {
    flex: 1,
  },
  cardContainer: {
    marginVertical: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    height: 80, // Aproximadamente h-20
    borderRadius: 16, // Aproximadamente rounded-2xl
  },
  cardHeaderTextContainer: {
    flex: 6,
    paddingHorizontal: 16, // px-4
    paddingVertical: 8, // py-2
  },
  stageText: {
    color: "white",
    fontSize: 12, // text-xs
  },
  titleText: {
    color: "white",
    fontSize: 18, // text-lg
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    height: "100%",
    borderLeftWidth: 1,
    borderLeftColor: "#F3F4F6", // Aproximación a border-gray-50
  },
  cardContentScroll: {
    alignItems: "center",
    justifyContent: "center",
  },
  circleContainer: {
    borderRadius: 40, // rounded-full (si el ancho es 80)
    padding: 4, // p-1
    width: 90, // w-20
    aspectRatio: 1, // aspect-square
    alignItems: "center",
    justifyContent: "center",
    margin: 15, // m-6
  },
  circle: {
    display: "flex",
    width: "100%",
    aspectRatio: 1,
    borderRadius: 40,
    justifyContent: "center",
    position: "relative",
  },
  circleText: {
    color: "white",
    fontSize: 25, // text-xl
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
  rotateX: {
    transform: [{ rotateX: "20deg" }],
  },

  /*innerShadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    width: "100%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    boxShadow: "inset 0px -10px rgb(0,0,0,0.5)",
  },*/
});
