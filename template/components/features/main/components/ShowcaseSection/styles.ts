import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

/** Sections read as raised cards on the page background instead of outlined boxes. */
const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS[theme].Surface.primary,
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.x5,
    gap: Spacing.x6,
    ...getShadow("sm", theme),
  },
  header: {
    gap: Spacing.x1,
  },
  body: {
    gap: Spacing.x6,
  },
});

export default styles;
