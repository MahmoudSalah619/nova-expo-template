import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  closeSection: { justifyContent: "flex-end", marginBottom: Spacing.x2 },
  modalContainer: {
    backgroundColor: COLORS[theme].Surface.elevated,
    borderRadius: Radius.xl,
    padding: Spacing.x5,
    ...getShadow("lg", theme),
  },
});

export default styles;
