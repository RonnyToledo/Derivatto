import Popover from "react-native-popover-view";
import React from "react";
import {
  TouchableOpacity,
  useWindowDimensions,
  Text,
  View,
} from "react-native";
import { X } from "lucide-react-native";

interface PopoverStackProps {
  children: React.ReactNode;
  isVisible: boolean;
  onRequestClose: () => void;
  ref: React.RefObject<any>;
  title?: string;
}

export default function PopoverStack({
  children,
  isVisible,
  onRequestClose,
  ref,
  title = "",
}: PopoverStackProps) {
  return (
    <Popover
      isVisible={isVisible}
      from={ref}
      onRequestClose={onRequestClose}
      popoverStyle={{
        borderRadius: 20,
        width: useWindowDimensions().width - 40,
        paddingVertical: 10,
        paddingHorizontal: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 25, paddingHorizontal: 10 }}>{title}</Text>
        <TouchableOpacity onPress={onRequestClose} style={{ height: 40 }}>
          <X />
        </TouchableOpacity>
      </View>
      {children}
    </Popover>
  );
}
