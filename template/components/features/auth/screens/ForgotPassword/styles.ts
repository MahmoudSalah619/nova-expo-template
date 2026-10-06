import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { moderateScale } from "@/constants/Metrics";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    gap: Spacing.x6,
    paddingVertical: Spacing.x4,
  },
  content: {
    gap: Spacing.x6,
  },
  iconChip: {
    width: Spacing.x14 + Spacing.x2,
    height: Spacing.x14 + Spacing.x2,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.actionSoft,
    marginBottom: Spacing.x2,
  },
  header: {
    gap: Spacing.x2,
  },
  card: {
    gap: Spacing.x5,
    padding: Spacing.x5,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.primary,
    ...getShadow("md", theme),
  },
  otpInput: {
    height: Spacing.x14,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.subtle,
    color: COLORS[theme].text.heading,
    fontSize: moderateScale(20),
    ...GLOBAL_STYLES.font700,
  },
  otpInputFocused: {
    borderColor: COLORS[theme].border.action,
    backgroundColor: COLORS[theme].Surface.primary,
  },
  otpInputFilled: {
    borderColor: COLORS[theme].border.primary,
    backgroundColor: COLORS[theme].Surface.primary,
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.x1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.x1,
  },
});

export default styles;
