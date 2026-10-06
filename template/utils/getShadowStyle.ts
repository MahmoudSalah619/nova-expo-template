import { COLORS } from "@/constants/Colors";
import { theme } from "@/utils/getTheme";

export default function getShadowStyle({
  radius = 12,
  opacity = theme === "dark" ? 0.4 : 0.08,
  offsetY = 6,
} = {}) {
  return {
    shadowColor: COLORS[theme].shadow.neutral,
    shadowOpacity: opacity,
    shadowOffset: {
      width: 0,
      height: offsetY,
    },
    shadowRadius: radius,
    elevation: Math.round(radius * 0.5),
  };
}
