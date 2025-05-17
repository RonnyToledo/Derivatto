import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { ejercicioFinish } from "@/assets/exe";
import { darkenColor } from "@/functions/tinycolors";
import { useRouter } from "expo-router";
import PopoverExample from "./ModalEje";
import { transformLevel } from "@/functions/transformLevel";
import ScrollViewReload from "../ScrollViewReload";
import { AuthContext } from "../auth/AuthContext";
import Learn from "@/assets/Icons/Icons/SVG/learn.svg";
import { images } from "@/constants/images";
import { styles } from "./stylesEjercicios";

interface Section {
  detectPorCent: (
    index: number,
    totalItems: number,
    maxTranslate?: number
  ) => number;
}
// al principio del archivo

type ImageCategory =
  | "matrices"
  | "vectores"
  | "limites"
  | "derivadas"
  | "integrales";

export default function StickyRender({ detectPorCent }: Section) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  return (
    <ScrollViewReload style={{ backgroundColor: "#F2EAE1" }}>
      {ejercicioFinish.map((section, index) => (
        <View key={index}>
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
                <Learn width={25} />
              </TouchableOpacity>
            </View>
          </View>
          {Object.keys(section.ej).map((key, ind) => {
            const color = (user?.vidas || 0) > 0 ? section.color : "gray";
            const darkerColor = darkenColor(color, 15);
            const valueTranslate = detectPorCent(ind, section.ej[key].length);
            const title = section.title.toLowerCase().trim() as ImageCategory;

            return (
              <View key={ind}>
                <View style={styles.cardContentScroll}>
                  {ind % 6 === 3 && (
                    <View
                      style={{
                        position: "absolute",
                        transform: [{ translateX: -valueTranslate }],
                      }}
                    >
                      <Image
                        source={images[title][Math.floor(ind / 6)]}
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
                      { transform: [{ translateX: valueTranslate }] },
                    ]}
                  >
                    <PopoverExample
                      LevelName={transformLevel(key)}
                      ui={key}
                      title={String(ind + 1)}
                      color={color}
                      darkerColor={darkerColor}
                      disabled={(user?.vidas || 0) === 0}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </ScrollViewReload>
  );
}
