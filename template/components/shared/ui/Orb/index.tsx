import { View } from "react-native";
import { OrbProps } from "./types";
import styles from "./styles";

/**
 * Soft translucent circle — decoration for hero surfaces.
 * Place inside a container with `overflow: "hidden"`.
 * @example
 * <Orb size={200} style={{ top: -80, end: -60 }} />
 */
export default function Orb({ size, style, opacity = 0.12 }: OrbProps) {
  return (
    <View
      pointerEvents="none"
      style={[styles.orb, { width: size, height: size, opacity }, style]}
    />
  );
}
