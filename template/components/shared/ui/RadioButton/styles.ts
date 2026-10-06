import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import { theme } from "@/utils/getTheme";
import { moderateScale } from "@/constants/Metrics";
import Spacing from "@/constants/Spacing";
import GLOBAL_STYLES from "@/constants/GlobalStyles";

const RADIO_SIZE = moderateScale(22);
const DOT_SIZE = moderateScale(10);

const styles = StyleSheet.create({
  container: {
    ...GLOBAL_STYLES.row,
    ...GLOBAL_STYLES.vhCentering,
  },
  radioContainer: {
    marginInlineEnd: Spacing.x2,
    ...GLOBAL_STYLES.vhCentering,
  },
  radio: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    borderRadius: RADIO_SIZE / 2,
    borderWidth: 2,
    borderColor: COLORS[theme].border.primary,
    backgroundColor: COLORS[theme].Surface.primary,
    ...GLOBAL_STYLES.vhCentering,
  },
  radioSelected: {
    borderColor: COLORS[theme].border.action,
  },
  radioDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: COLORS[theme].Surface.action,
  },
  disabledRadio: {
    opacity: 0.5,
  },
});

export default styles;
