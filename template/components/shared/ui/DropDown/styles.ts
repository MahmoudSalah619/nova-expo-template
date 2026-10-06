import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import { theme } from "@/utils/getTheme";
import { moderateScale } from "@/constants/Metrics";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import GLOBAL_STYLES from "@/constants/GlobalStyles";

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderRadius: Radius.md,
    paddingVertical: moderateScale(10),
  },
  item: {
    marginVertical: moderateScale(2),
    paddingVertical: Spacing.x1,
    borderRadius: Radius.sm,
    ...GLOBAL_STYLES.row,
  },
  multiItem: {
    paddingHorizontal: Spacing.x3,
    ...GLOBAL_STYLES.gap8,
  },
  singleItem: {
    paddingHorizontal: Spacing.x3,
    paddingVertical: Spacing.x2,
  },
  selectedItem: {
    backgroundColor: COLORS[theme].Surface.actionSoft,
    borderRadius: Radius.sm,
  },
  selectedCheckContainer: {
    marginStart: "auto",
    marginEnd: Spacing.x2,
    backgroundColor: COLORS[theme].Surface.transparent,
    padding: Spacing.x1,
    borderRadius: Spacing.x1,
    ...GLOBAL_STYLES.vhCentering,
  },
  modalContainer: {
    position: "absolute",
  },
  flatList: {
    padding: Spacing.x2,
    backgroundColor: COLORS[theme].Surface.elevated,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    ...getShadow("lg", theme),
  },
  labelText: {
    marginBottom: Spacing.x2,
  },
  multiInputContainer: {
    ...GLOBAL_STYLES.row,
    alignContent: "center",
    flexWrap: "wrap",
    borderWidth: 1.5,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.subtle,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.x2,
    paddingVertical: Spacing.x1,
  },
  multiInputContainerActive: {
    borderColor: COLORS[theme].border.action,
    backgroundColor: COLORS[theme].Surface.primary,
  },
  prefixContainer: {
    marginEnd: Spacing.x2,
    ...GLOBAL_STYLES.vhCentering,
  },
  placeHolder: {
    ...GLOBAL_STYLES.fullSize,
    paddingHorizontal: moderateScale(6),
    paddingVertical: Spacing.x2,
    color: COLORS[theme].text.caption,
  },
  tagsInInputWrapper: {
    ...GLOBAL_STYLES.fullSize,
    ...GLOBAL_STYLES.row,
    ...GLOBAL_STYLES.gap8,
    flexWrap: "wrap",
  },
  tagInInput: {
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.x3,
    paddingVertical: moderateScale(6),
    ...GLOBAL_STYLES.gap4,
    ...GLOBAL_STYLES.row,
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
  removeIconInInput: {
    padding: Spacing.x1,
    ...GLOBAL_STYLES.vhCentering,
  },
  errorBorder: {
    borderColor: COLORS[theme].border.danger,
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
