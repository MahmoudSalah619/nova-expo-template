import { IconProps } from "@/components/shared/ui/Icon/types";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ShieldIcon = ({ size = 24, color = "#0F1222" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ShieldIcon;
