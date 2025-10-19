import React from "react";
import { IconComponentProps } from "./types";
import { iconsList } from "./list";
import { View } from "react-native";

const Icon = ({
  name,
  size,
  color,
  direction,
  rotateX,
  rotateY,
}: IconComponentProps) => {
  const IconComponent = iconsList[name];
  return (
    <View
      style={{
        direction: direction || "inherit",
        transform: [
          { rotateX: rotateX ? `${rotateX}deg` : "0deg" },
          { rotateY: rotateY ? `${rotateY}deg` : "0deg" },
        ],
      }}
    >
      <IconComponent size={size || 24} color={color} />
    </View>
  );
};

export default Icon;
