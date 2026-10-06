import React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "@/components/shared/ui/Icon/types";
import { moderateScale } from "@/constants/Metrics";

export default function CorrectCircle({
  size = moderateScale(16),
  color = "#0a7ea4",
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 1.8335C11.397 1.83367 14.166 4.60341 14.166 8.00049C14.1658 11.3974 11.3969 14.1663 8 14.1665C4.60292 14.1665 1.83319 11.3975 1.83301 8.00049C1.83301 4.6033 4.60281 1.8335 8 1.8335ZM11.54 5.40674C11.1514 5.01814 10.5146 5.01814 10.126 5.40674L7.05273 8.47998L5.87305 7.30029L5.79785 7.23193C5.43236 6.93413 4.90071 6.93424 4.53516 7.23193L4.45898 7.30029C4.07093 7.68879 4.07093 8.32488 4.45898 8.71338L6.3457 10.6001C6.53167 10.7861 6.78539 10.893 7.05273 10.8931C7.32018 10.8931 7.57373 10.7861 7.75977 10.6001L11.54 6.8208L11.5459 6.81396C11.9231 6.42355 11.9317 5.79851 11.54 5.40674Z"
        fill={color}
        stroke={color}
      />
    </Svg>
  );
}
