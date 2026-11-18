import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";
import { themeType } from "@/@types/mainTypes";
import { theme } from "@/utils/getTheme";

/** Highlight is a touch lighter than the block, so the sweep stays subtle. */
const HIGHLIGHT: Record<themeType, string> = {
  light: "#F8F9FC",
  dark: "#353B4E",
};

export const SKELETON_DEFAULTS = {
  baseColor: COLORS[theme].Surface.subtle,
  highlightColor: HIGHLIGHT[theme],
  radius: Radius.xs,
  shimmer: {
    /** One pass of the highlight, in ms. */
    duration: 1200,
    /** Rest between passes, in ms. */
    pause: 400,
    /** Highlight width as a share of the block width. */
    bandRatio: 0.6,
  },
  pulse: {
    /** One fade (in or out), in ms. */
    duration: 800,
    minOpacity: 0.45,
  },
  text: {
    lineHeight: Spacing.x3,
    gap: Spacing.x2,
    /** The last line is shorter, like the end of a paragraph. */
    lastLineWidth: "60%",
  },
} as const;
