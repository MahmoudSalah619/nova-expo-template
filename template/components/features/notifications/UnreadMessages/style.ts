import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.pill,
    minWidth: Spacing.x4,
    height: Spacing.x4,
    paddingHorizontal: Spacing.x1,
    borderWidth: 2,
    borderColor: COLORS[theme].Surface.bg,
  },
});
export default styles;
