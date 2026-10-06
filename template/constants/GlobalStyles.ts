/* eslint-disable react-native/sort-styles */
import { I18nManager, StyleSheet } from "react-native";
import METRICS from "./Metrics";
import Radius from "./Radius";
import Spacing from "./Spacing";

const GLOBAL_STYLES = StyleSheet.create({
  /* FONTS */
  font300: {
    fontFamily: "cosmica_300",
  },
  font400: {
    fontFamily: "cosmica_400",
  },
  font500: {
    fontFamily: "cosmica_500",
  },
  font600: {
    fontFamily: "cosmica_600",
  },
  font700: {
    fontFamily: "cosmica_700",
  },
  font800: {
    fontFamily: "cosmica_800",
  },
  /* Containers */
  mainContainer: {
    padding: METRICS.generalSpacingValue,
  },
  /** Raised card surface — pair with a backgroundColor from COLORS.Surface. */
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.x5,
  },
  flatlistProductColumnWrapper: {
    justifyContent: "space-between",
    padding: METRICS.generalSpacingValue,
    paddingVertical: "2%",
  },
  /* Flex */
  fullSize: {
    flex: 1,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  rowCenter: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  rowJustifyBetween: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vhCentering: {
    alignItems: "center",
    justifyContent: "center",
  },
  /* Gaps */
  gap: {
    gap: METRICS.generalSpacingValue,
  },
  gap4: {
    gap: 4,
  },
  gap8: {
    gap: 8,
  },
  gap16: {
    gap: 16,
  },
  gap24: {
    gap: 24,
  },
  gap32: {
    gap: 32,
  },
  /* Spacing & Orientation */
  flipInArabic: {
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  arrowRight: {
    transform: "rotate(-90deg)",
  },
  arrowLeft: {
    transform: "rotate(90deg)",
  },
  mainLogo: {
    marginVertical: Spacing.x8,
  },
});

export default GLOBAL_STYLES;
