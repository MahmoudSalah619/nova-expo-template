import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const STAGE_HEIGHT = Spacing.x14 * 2;

const styles = StyleSheet.create({
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.x2,
  },
  chip: {
    paddingVertical: Spacing.x2,
    paddingHorizontal: Spacing.x3,
    borderRadius: Radius.xl,
    backgroundColor: COLORS[theme].Surface.subtle,
  },
  chipSelected: {
    backgroundColor: COLORS[theme].Surface.action,
  },
  /** Fixed-size stage so the page doesn't jump while the preview animates. */
  stage: {
    height: STAGE_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: Radius.md,
    backgroundColor: COLORS[theme].Surface.subtle,
  },
  previewBox: {
    width: STAGE_HEIGHT * 1.6,
    height: Spacing.x14,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.action,
  },
});

export default styles;
