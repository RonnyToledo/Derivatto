import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: {
    padding: 4,
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
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
    borderLeftWidth: 3,
    borderLeftColor: "#F2EAE1", // Aproximación a border-gray-50
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
    margin: 5, // m-6
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
