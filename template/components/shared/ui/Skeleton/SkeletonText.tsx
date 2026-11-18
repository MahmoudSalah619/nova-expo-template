import { StyleSheet, View } from "react-native";

import Skeleton from "./Skeleton";
import { SKELETON_DEFAULTS } from "./constants";
import { SkeletonTextProps } from "./types";

const TEXT = SKELETON_DEFAULTS.text;

/**
 * A paragraph of placeholder lines; the last one is shorter.
 *
 * @example
 * <SkeletonText lines={3} />
 */
export default function SkeletonText({
  lines = 3,
  lineHeight = TEXT.lineHeight,
  animation,
  style,
}: SkeletonTextProps) {
  return (
    <View style={[styles.paragraph, style]}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          height={lineHeight}
          width={index === lines - 1 && lines > 1 ? TEXT.lastLineWidth : "100%"}
          animation={animation}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    gap: TEXT.gap,
  },
});
