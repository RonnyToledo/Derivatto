import Popover from "react-native-popover-view";
import React from "react";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import { X } from "lucide-react-native";

interface PopoverStackProps {
  children: React.ReactNode;
  isVisible: boolean;
  onRequestClose: () => void;
  ref: React.RefObject<any>;
}

export default function PopoverStack({
  children,
  isVisible,
  onRequestClose,
  ref,
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
      <TouchableOpacity
        onPress={onRequestClose}
        style={{ height: 40, width: "100%", alignItems: "flex-end" }}
      >
        <X />
      </TouchableOpacity>
      {children}
    </Popover>
  );
}
