import { LinearGradient } from "expo-linear-gradient";
import GRADIENTS from "@/constants/Gradients";
import { theme } from "@/utils/getTheme";
import { GradientSurfaceProps } from "./types";

/**
 * Themed diagonal gradient container for hero cards.
 * @example
 * <GradientSurface style={styles.hero}>...</GradientSurface>
 */
export default function GradientSurface({
  children,
  variant = "action",
  style,
}: GradientSurfaceProps) {
  return (
    <LinearGradient
      colors={GRADIENTS[theme][variant]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}
