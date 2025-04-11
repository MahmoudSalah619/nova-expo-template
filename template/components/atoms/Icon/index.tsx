import React from "react";
import { IconComponentProps } from "./types";
import { iconsList } from "./list";

const Icon = ({ name, size, color, strokeWidth }: IconComponentProps) => {
  const IconComponent = iconsList[name];
  return (
    <IconComponent
      size={size || 24}
      strokeWidth={strokeWidth || 1.9}
      color={color}
    />
  );
};

export default Icon;
