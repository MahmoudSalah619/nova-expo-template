import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    gap: Spacing.x6,
    paddingVertical: Spacing.x4,
  },
  hero: {
    backgroundColor: COLORS[theme].Surface.action,
    borderRadius: Radius.xxl,
    padding: Spacing.x6,
    paddingTop: Spacing.x8,
    gap: Spacing.x3,
    overflow: "hidden",
    ...getShadow("lg", theme, "action"),
  },
  heroOrbLarge: {
    top: -Spacing.x14 * 2,
    end: -Spacing.x14 * 1.5,
  },
  heroOrbSmall: {
    bottom: -Spacing.x14,
    start: -Spacing.x8,
  },
  heroBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.x1,
    paddingHorizontal: Spacing.x3,
    paddingVertical: Spacing.x1,
    borderRadius: Radius.pill,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    marginBottom: Spacing.x2,
  },
  heroBody: {
    opacity: 0.85,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.x3,
  },
  featureCard: {
    flexBasis: "47%",
    flexGrow: 1,
    gap: Spacing.x3,
    padding: Spacing.x4,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.primary,
    ...getShadow("sm", theme),
  },
  featureIcon: {
    width: Spacing.x10,
    height: Spacing.x10,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
  actions: {
    gap: Spacing.x3,
  },
});

export default styles;
