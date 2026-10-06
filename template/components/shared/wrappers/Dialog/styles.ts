import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  trigger: {
    width: Spacing.x12,
    height: Spacing.x12,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.danger,
  },
  content: {
    alignSelf: "center",
    alignItems: "center",
    gap: Spacing.x2,
    padding: Spacing.x6,
    paddingTop: Spacing.x8,
    borderRadius: Radius.xl,
    backgroundColor: COLORS[theme].Surface.elevated,
    ...getShadow("lg", theme),
  },
  iconCircle: {
    width: Spacing.x14 + Spacing.x2,
    height: Spacing.x14 + Spacing.x2,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.x3,
    backgroundColor: COLORS[theme].Surface.dangerSoft,
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.x3,
    marginTop: Spacing.x5,
    alignSelf: "stretch",
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.x2,
    height: Spacing.x12,
    borderRadius: Radius.md,
  },
  cancelBtn: {
    backgroundColor: COLORS[theme].Surface.subtle,
  },
  deleteBtn: {
    backgroundColor: COLORS[theme].Surface.danger,
  },
});

export default styles;
