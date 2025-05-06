import { Modal } from "react-native";
import { PropsWithChildren } from "react";
import {
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { X } from "lucide-react-native";

interface ModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  title: string;
}

export default function ModalComponent({
  children,
  open,
  title,
  onOpenChange,
}: PropsWithChildren & ModalProps) {
  return (
    <Modal
      visible={open}
      style={styles.modal}
      animationType="fade"
      transparent={true}
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable
        onPress={() => onOpenChange(false)}
        style={[{ height: useWindowDimensions().height }]}
      >
        <View style={styles.modalOverlay}>
          <Pressable>
            <View style={styles.container}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <View></View>
                <Text style={styles.titleHeader}>{title}</Text>
                <TouchableOpacity onPress={() => onOpenChange(false)}>
                  <X size={20} color="#ccc" />
                </TouchableOpacity>
              </View>
              <ScrollView>{children}</ScrollView>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    maxWidth: "90%",
    alignSelf: "center",
    boxShadow: "0 10px 10px rgba(0,0,0,0.2)",
    elevation: 5,
  },
  titleHeader: {
    fontWeight: 600,
    fontSize: 20,
  },
});
