import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS[theme].Surface.primary,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    padding: Spacing.x5,
    width: "100%",
    ...getShadow("md", theme),
  },
});

export default styles;
