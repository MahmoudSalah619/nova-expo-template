import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "@/components/shared/ui/Icon/types";

const CloseIcon = ({ size = 24, color = "#272A2A" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7.75732 7.75732L16.2426 16.2426"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.75739 16.2426L16.2427 7.75732"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CloseIcon;
