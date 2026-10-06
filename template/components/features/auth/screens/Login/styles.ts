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
  brandMark: {
    width: Spacing.x12,
    height: Spacing.x12,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.action,
    marginBottom: Spacing.x5,
    ...getShadow("md", theme, "action"),
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
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.x3,
  },
  dividerLine: {
    flex: 1,
  },
  socialList: {
    gap: Spacing.x3,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.x1,
    paddingTop: Spacing.x2,
  },
});

export default styles;
