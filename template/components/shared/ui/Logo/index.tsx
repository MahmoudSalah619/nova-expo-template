import React from "react";
import Svg, { Circle, G, Path, Rect } from "react-native-svg";
import { COLORS } from "@/constants/Colors";

const BADGE_COLOR = COLORS.light.Surface.action;
const MARK_COLOR = "#fff";

export default function Logo({ width = 120, height = 90 }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="8 8 104 104"
      style={{ alignSelf: "center" }}
    >
      <Rect x={8} y={8} width={104} height={104} rx={28} fill={BADGE_COLOR} />
      <G transform="translate(-3 8)">
        <Path
          d="M28 80C32 88 41 86 42 74C43 60 41 48 45 41C49 34 54 40 57 50C62 66 65 84 72 84C79 84 78 68 80 56C81 50 83 45 87 40"
          fill="none"
          stroke={MARK_COLOR}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <G transform="translate(94.6 30.2) rotate(38) scale(0.8)" fill={MARK_COLOR}>
          <Path d="M-3 2L-10 11L-3 8Z" />
          <Path d="M3 2L10 11L3 8Z" />
          <Path d="M0-17C6-11 7-1 4 8H-4C-7-1-6-11 0-17Z" />
          <Circle cx={0} cy={-6} r={2.3} fill={BADGE_COLOR} />
        </G>
      </G>
    </Svg>
  );
}
