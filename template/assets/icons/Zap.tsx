import { IconProps } from "@/components/shared/ui/Icon/types";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ZapIcon = ({ size = 24, color = "#0F1222" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ZapIcon;
