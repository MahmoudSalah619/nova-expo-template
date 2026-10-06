import React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "@/components/shared/ui/Icon/types";
import { moderateScale } from "@/constants/Metrics";

export default function EyeIcon({ size = moderateScale(18), color = "#0a7ea4" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M11.6854 8.99994C11.6854 10.4849 10.4854 11.6849 9.00043 11.6849C7.51543 11.6849 6.31543 10.4849 6.31543 8.99994C6.31543 7.51494 7.51543 6.31494 9.00043 6.31494C10.4854 6.31494 11.6854 7.51494 11.6854 8.99994Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.99988 15.2025C11.6474 15.2025 14.1149 13.6425 15.8324 10.9425C16.5074 9.88504 16.5074 8.10754 15.8324 7.05004C14.1149 4.35004 11.6474 2.79004 8.99988 2.79004C6.35238 2.79004 3.88488 4.35004 2.16738 7.05004C1.49238 8.10754 1.49238 9.88504 2.16738 10.9425C3.88488 13.6425 6.35238 15.2025 8.99988 15.2025Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
