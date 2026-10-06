import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "@/components/shared/ui/Icon/types";

function ArrowDown({ size = 11, color = "#0a7ea4" }: IconProps) {
  return (
    <Svg width={size} height={size * (6 / 11)} viewBox="0 0 11 6" fill="none">
      <Path
        d="M9.75.75s-3.314 4.5-4.5 4.5S.75.75.75.75"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ArrowDown;
