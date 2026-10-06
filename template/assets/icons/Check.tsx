import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "@/components/shared/ui/Icon/types";

function Check({ size = 9, color = "#0047BB" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M4 8.00008L6.66353 10.6636L12 5.33655"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Check;
