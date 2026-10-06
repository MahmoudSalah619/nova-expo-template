import { IconProps } from "@/components/shared/ui/Icon/types";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const MapPinIcon = ({ size = 24, color = "#0F1222" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 10a3 3 0 11-6 0 3 3 0 016 0z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MapPinIcon;
