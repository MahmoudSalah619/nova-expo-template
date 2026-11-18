import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  header: {
    gap: Spacing.x2,
    marginBottom: Spacing.x2,
  },
  sections: {
    gap: Spacing.x4,
  },
  /** Face of the custom Pressable used by the Pushable examples. */
  face: {
    height: Spacing.x13,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.action,
  },
  faceDanger: {
    backgroundColor: COLORS[theme].Surface.danger,
  },
});

export default styles;
