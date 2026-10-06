import { StyleSheet } from "react-native";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { COLORS } from "@/constants/Colors";
import { moderateScale } from "@/constants/Metrics";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  btn: {
    borderRadius: Radius.md,
    width: "100%",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingVertical: Spacing.x6,
    margin: Spacing.x3,
  },
  content: {
    alignItems: "center",
    flexDirection: "column",
    gap: Spacing.x3,
    justifyContent: "center",
    marginVertical: Spacing.x6,
  },
  outlineTxt: {
    color: COLORS[theme].text.primary,
    fontSize: moderateScale(15),
    ...GLOBAL_STYLES.font500,
    marginTop: Spacing.x4,
  },
  subTitle: {
    color: COLORS[theme].text.body,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    textAlign: "center",
    ...GLOBAL_STYLES.font400,
  },
  title: {
    color: COLORS[theme].text.heading,
    fontSize: moderateScale(20),
    ...GLOBAL_STYLES.font700,
  },
});

export default styles;
