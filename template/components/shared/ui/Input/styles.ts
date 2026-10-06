import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { theme } from "@/utils/getTheme";
import { moderateScale } from "@/constants/Metrics";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";

/**
 * Inputs sit on a tinted "subtle" surface with a hairline border; focus lifts
 * them onto the primary surface with a 1.5px accent ring.
 */
const styles = StyleSheet.create({
  errorBorder: {
    borderColor: COLORS[theme].border.danger,
    backgroundColor: COLORS[theme].Surface.primary,
  },
  input: {
    color: COLORS[theme].text.heading,
    fontSize: moderateScale(15),
    textAlignVertical: "center",
    flex: 1,
    ...GLOBAL_STYLES.font500,
    paddingVertical: 0,
    height: "100%",
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: COLORS[theme].Surface.subtle,
    borderColor: COLORS[theme].border.subtle,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    flexDirection: "row",
    paddingHorizontal: Spacing.x4,
  },
  spaceEnd10: { marginEnd: Spacing.x2 },
  focusBorder: {
    borderColor: COLORS[theme].border.action,
    backgroundColor: COLORS[theme].Surface.primary,
  },
  labelContainer: {
    marginBottom: Spacing.x2,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  sm: {
    height: Spacing.x10,
  },
  lg: {
    height: Spacing.x12,
  },
  xl: {
    height: Spacing.x14,
  },
});

export default styles;
