import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS[theme].Surface.elevated,
    borderTopLeftRadius: Radius.xxl,
    borderTopRightRadius: Radius.xxl,
    paddingTop: Spacing.x2,
  },
  headerTitle: {
    lineHeight: 29,
    textAlign: "center",
  },
  headerTitleContainer: {
    gap: Spacing.x3,
    marginBottom: Spacing.x4,
    marginTop: Spacing.x2,
  },
});

export default styles;
