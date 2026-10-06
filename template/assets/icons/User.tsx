import { IconProps } from "@/components/shared/ui/Icon/types";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const UserIcon = ({ size = 24, color = "#0F1222" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default UserIcon;
