import React from "react";
import { IconComponentProps } from "./types";
import { iconsList } from "./list";
import { View } from "react-native";

const Icon = ({
  name,
  size,
  color,
  strokeWidth,
  direction,
}: IconComponentProps) => {
  const IconComponent = iconsList[name];
  return (
    <View style={{ direction: direction || "inherit" }}>
      <IconComponent
        size={size || 24}
        strokeWidth={strokeWidth || 1.9}
        color={color}
      />
    </View>
  );
};

export default Icon;
