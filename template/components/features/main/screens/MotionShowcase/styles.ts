import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const BOX_HEIGHT = Spacing.x14;

const styles = StyleSheet.create({
  header: {
    gap: Spacing.x2,
    marginBottom: Spacing.x2,
  },
  sections: {
    gap: Spacing.x4,
  },
  box: {
    height: BOX_HEIGHT,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
  /** Fixed height so the layout doesn't jump when the exit box is removed. */
  exitArea: {
    height: BOX_HEIGHT,
  },
});

export default styles;
