import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import { moderateScale } from "@/constants/Metrics";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

/** Must match `imageWidth` of the expo-splash-screen plugin in app.json. */
export const SPLASH_LOGO_SIZE = 200;
const RING_SIZE = moderateScale(160);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.bg,
    zIndex: 999,
    elevation: 999,
  },
  stage: {
    width: SPLASH_LOGO_SIZE,
    height: SPLASH_LOGO_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: SPLASH_LOGO_SIZE,
    height: SPLASH_LOGO_SIZE,
  },
  ring: {
    position: "absolute",
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: Radius.pill,
    backgroundColor: COLORS[theme].Surface.action,
  },
  wordmark: {
    position: "absolute",
    bottom: Spacing.x14 * 2,
    alignItems: "center",
    gap: Spacing.x3,
  },
  dots: {
    flexDirection: "row",
    gap: Spacing.x1 + 2,
  },
  dot: {
    width: Spacing.x2,
    height: Spacing.x2,
    borderRadius: Radius.pill,
    backgroundColor: COLORS[theme].Surface.action,
  },
});

export default styles;
