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
  },
  trigger: {
    padding: Spacing.x2,
  },
  menu: {
    backgroundColor: COLORS[theme].Surface.elevated,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    padding: Spacing.x2,
    ...getShadow("lg", theme),
  },
  itemText: {
    fontSize: moderateScale(15),
    color: COLORS[theme].text.heading,
    marginRight: Spacing.x3,
    ...GLOBAL_STYLES.font500,
  },
});

export default styles;
