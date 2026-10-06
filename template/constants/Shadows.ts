import { ViewStyle } from "react-native";
import { COLORS } from "./Colors";
import type { themeType } from "@/@types/mainTypes";

export type ShadowLevel = "sm" | "md" | "lg";

const LEVELS: Record<ShadowLevel, Pick<ViewStyle, "shadowOffset" | "shadowRadius" | "elevation"> & { opacity: number }> = {
  sm: { shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2, opacity: 0.06 },
  md: { shadowOffset: { width: 0, height: 8 }, shadowRadius: 20, elevation: 6, opacity: 0.1 },
  lg: { shadowOffset: { width: 0, height: 16 }, shadowRadius: 32, elevation: 12, opacity: 0.16 },
};

/**
 * Soft, layered shadow. Neutral by default; pass `tone: "action"` for the
 * colored glow used under primary buttons.
 * @example
 * const styles = StyleSheet.create({ card: { ...getShadow("md", theme) } });
 */
export function getShadow(
  level: ShadowLevel,
  theme: themeType,
  tone: keyof (typeof COLORS)["light"]["shadow"] = "neutral"
): ViewStyle {
  const { opacity, ...rest } = LEVELS[level];
  const isDark = theme === "dark";
  return {
    shadowColor: COLORS[theme].shadow[tone],
    shadowOpacity: tone === "action" ? 0.35 : isDark ? opacity * 3 : opacity,
    ...rest,
  };
}
