import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  container: {
    gap: Spacing.x6,
    paddingVertical: Spacing.x4,
  },
  backButton: {
    width: Spacing.x11,
    height: Spacing.x11,
    borderRadius: Radius.pill,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.primary,
    marginBottom: Spacing.x4,
  },
  backIcon: {
    transform: [{ rotate: "180deg" }],
  },
  header: {
    gap: Spacing.x2,
  },
  formCard: {
    gap: Spacing.x4,
    padding: Spacing.x5,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.primary,
    ...getShadow("md", theme),
  },
  termsRow: {
    paddingVertical: Spacing.x1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.x1,
  },
});

export default styles;
