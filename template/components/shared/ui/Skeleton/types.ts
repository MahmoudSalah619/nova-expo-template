import { DimensionValue, StyleProp, ViewStyle } from "react-native";

/** "shimmer": a light sweep passes over the block. "pulse": the block fades in and out. */
export type SkeletonAnimation = "shimmer" | "pulse";

export interface SkeletonProps {
  /** Number (px) or percentage string. Defaults to "100%". */
  width?: DimensionValue;
  height?: DimensionValue;
  /** Corner radius. Ignored when `isCircle`. */
  radius?: number;
  /** Round block (avatars): uses `height` as the diameter. */
  isCircle?: boolean;
  /** Defaults to "shimmer". */
  animation?: SkeletonAnimation;
  style?: StyleProp<ViewStyle>;
}

export interface SkeletonTextProps {
  /** Number of placeholder lines. Defaults to 3. */
  lines?: number;
  /** Height of each line, in px. */
  lineHeight?: number;
  animation?: SkeletonAnimation;
  style?: StyleProp<ViewStyle>;
}
