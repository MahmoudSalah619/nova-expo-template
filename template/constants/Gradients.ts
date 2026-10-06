import { COLORS } from "./Colors";
import { themeType } from "@/@types/mainTypes";

/** Two-stop gradients keyed by theme. Start/end are ordered top-left → bottom-right. */
const GRADIENTS: Record<themeType, { action: [string, string]; actionSoft: [string, string] }> = {
  light: {
    action: [COLORS.light.Surface.action, "#7C3AED"],
    actionSoft: ["#EEF0FF", "#F5F0FF"],
  },
  dark: {
    action: [COLORS.dark.Surface.action, "#8B5CF6"],
    actionSoft: ["#2A2C55", "#332A55"],
  },
};

export default GRADIENTS;
