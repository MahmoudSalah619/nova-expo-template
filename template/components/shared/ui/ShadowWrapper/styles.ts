import { Platform, StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import { getShadow } from "@/constants/Shadows";
import { theme } from "@/utils/getTheme";
import Spacing from "@/constants/Spacing";

const styles = StyleSheet.create({
  inner: {
    backgroundColor: COLORS[theme].Surface.primary,
    overflow: "hidden",
    ...(Platform.OS === "ios" ? {} : getShadow("md", theme)),
  },
  outer: {
    backgroundColor: COLORS[theme].Surface.primary,
    marginHorizontal: Spacing.x2,
    marginVertical: Spacing.x2,
    ...(Platform.OS === "android" ? {} : getShadow("md", theme)),
  },
});

export default styles;
