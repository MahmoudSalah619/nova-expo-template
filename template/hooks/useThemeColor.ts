/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { colorGroupType } from "@/@types/mainTypes";
import { COLORS } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

/**
 * Resolves a grouped color for the current color scheme.
 * @example
 * const { targetColor } = useThemeColor("text", "heading");
 */
export function useThemeColor<T extends colorGroupType>(
  type?: T,
  variant?: keyof (typeof COLORS.light)[T],
  preventDarkModeColor = false
) {
  const theme = useColorScheme() === "dark" ? "dark" : "light";
  const group = type ? COLORS[preventDarkModeColor ? "light" : theme][type] : undefined;
  const targetColor =
    group && variant ? (group[variant] as string) : undefined;

  return { theme, targetColor };
}
