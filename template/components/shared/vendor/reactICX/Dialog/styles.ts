import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { moderateScale } from "@/constants/Metrics";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  trigger: {
    padding: Spacing.x3,
    backgroundColor: COLORS[theme].Surface.subtle,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: COLORS[theme].Surface.elevated,
    borderRadius: Radius.xl,
    padding: Spacing.x6,
    alignItems: "center",
    gap: Spacing.x4,
    ...getShadow("lg", theme),
  },
  iconCircle: {
    width: Spacing.x14 + Spacing.x2,
    height: Spacing.x14 + Spacing.x2,
    borderRadius: Radius.lg,
    backgroundColor: COLORS[theme].Surface.actionSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.x2,
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.x3,
    marginTop: Spacing.x2,
    width: "100%",
  },
  btn: {
    flex: 1,
    paddingVertical: Spacing.x3,
    paddingHorizontal: Spacing.x4,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: Spacing.x2,
  },
  cancelBtn: {
    backgroundColor: COLORS[theme].Surface.subtle,
  },
  deleteBtn: {
    backgroundColor: COLORS[theme].Surface.action,
  },
  cancelText: {
    color: COLORS[theme].text.body,
    fontSize: moderateScale(15),
    ...GLOBAL_STYLES.font600,
  },
  deleteText: {
    color: COLORS[theme].text.onAction,
    fontSize: moderateScale(15),
    ...GLOBAL_STYLES.font600,
  },
});

export default styles;
