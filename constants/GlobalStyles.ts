/* eslint-disable react-native/sort-styles */
import { I18nManager, StyleSheet } from "react-native";
import METRICS from "./Metrics";

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
  rowcenter: {
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
    marginVertical: 40,
  },
});

export default GLOBAL_STYLES;
