import { COLORS } from "@/constants/Colors";
import GRADIENTS from "@/constants/Gradients";
import { theme } from "@/utils/getTheme";
import { GradientColors } from "./types";

const PINK = "#EC4899";

export const MOTION_TEXT_DEFAULTS = {
  gradient: {
    /** Brand indigo → violet → pink. */
    colors: [
      COLORS[theme].Surface.action,
      GRADIENTS[theme].action[1],
      PINK,
    ] as GradientColors,
    duration: 4000,
    glowRadius: 12,
  },
  shimmer: {
    duration: 1800,
    /** Highlight band width as a share of the text width. */
    bandRatio: 0.4,
    baseColor: COLORS[theme].text.caption,
    highlightColor: COLORS[theme].text.heading,
  },
  typing: { speed: 60, cursorBlinkMs: 500 },
  words: { step: 80 },
  letters: { step: 30 },
  count: { duration: 1200 },
} as const;
