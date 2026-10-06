import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { moderateScale } from "@/constants/Metrics";
import { I18nManager, StyleSheet } from "react-native";

/**
 * Type scale. Headings are tight and heavy, body is relaxed — the scale
 * contrast between them is what carries the hierarchy on every screen.
 */
const styles = StyleSheet.create({
  text: {
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
    letterSpacing: 0,
  },
  H0: {
    fontSize: moderateScale(44),
    lineHeight: moderateScale(48),
    letterSpacing: -1.2,
    ...GLOBAL_STYLES.font800,
  },
  H1: {
    fontSize: moderateScale(32),
    lineHeight: moderateScale(38),
    letterSpacing: -0.8,
    ...GLOBAL_STYLES.font700,
  },
  H2: {
    fontSize: moderateScale(26),
    lineHeight: moderateScale(32),
    letterSpacing: -0.5,
    ...GLOBAL_STYLES.font700,
  },
  H3: {
    fontSize: moderateScale(22),
    lineHeight: moderateScale(28),
    letterSpacing: -0.3,
    ...GLOBAL_STYLES.font600,
  },
  H4: {
    fontSize: moderateScale(18),
    lineHeight: moderateScale(24),
    letterSpacing: -0.2,
    ...GLOBAL_STYLES.font600,
  },
  lg: {
    fontSize: moderateScale(17),
    lineHeight: moderateScale(24),
    ...GLOBAL_STYLES.font600,
  },
  md: {
    fontSize: moderateScale(15),
    lineHeight: moderateScale(23),
    ...GLOBAL_STYLES.font400,
  },
  sm: {
    fontSize: moderateScale(13),
    lineHeight: moderateScale(19),
    ...GLOBAL_STYLES.font400,
  },
  xsm: {
    fontSize: moderateScale(11),
    lineHeight: moderateScale(16),
    ...GLOBAL_STYLES.font500,
  },
});

export default styles;
