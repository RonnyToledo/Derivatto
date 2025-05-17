import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
import React, { useState, useCallback, useContext } from "react";
import { ejercicioFinish } from "@/assets/exe";
import { darkenColor } from "@/functions/tinycolors";
import { useRouter } from "expo-router";
import PopoverExample from "./ModalEje";
import { transformLevel } from "@/functions/transformLevel";
import { AuthContext } from "../auth/AuthContext";
import { images } from "@/constants/images";
import { styles } from "./stylesEjercicios";
import Learn from "@/assets/Icons/Icons/SVG/learn.svg";

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

type ImageCategory =
  | "matrices"
  | "vectores"
  | "limites"
  | "derivadas"
  | "integrales";

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
      style={{ backgroundColor: "#F2EAE1" }}
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
        const title = section.title.toLowerCase().trim() as ImageCategory;

        return (
          <View style={styles.cardContentScroll}>
            {index % 6 === 3 && (
              <View
                style={{
                  position: "absolute",
                  transform: [{ translateX: -valueTranslate }],
                }}
              >
                <Image
                  source={images[title][Math.floor(index / 6)]}
                  style={{
                    width: 150,
                    height: 200,
                  }}
                  resizeMode="contain"
                />
              </View>
            )}
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
              <Learn width={35} height={35} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}
