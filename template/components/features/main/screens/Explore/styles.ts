import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  screen: {
    gap: Spacing.x6,
    paddingBottom: Spacing.x14 * 2.5,
  },
  header: {
    gap: Spacing.x1,
  },
  section: {
    gap: Spacing.x3,
  },
  sectionLabel: {
    letterSpacing: 1.2,
    marginStart: Spacing.x1,
  },
  featuredCard: {
    backgroundColor: COLORS[theme].Surface.action,
    borderRadius: Radius.xl,
    padding: Spacing.x5,
    gap: Spacing.x3,
    overflow: "hidden",
    ...getShadow("lg", theme, "action"),
  },
  featuredOrb: {
    bottom: -Spacing.x14,
    end: -Spacing.x8,
  },
  featuredOrbSmall: {
    top: -Spacing.x6,
    end: Spacing.x14 * 2,
  },
  featuredIcon: {
    width: Spacing.x11,
    height: Spacing.x11,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
  featuredBody: {
    opacity: 0.85,
  },
  featuredCta: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.x2,
    paddingHorizontal: Spacing.x4,
    paddingVertical: Spacing.x2,
    borderRadius: Radius.pill,
    backgroundColor: COLORS[theme].Surface.primary,
  },
  listCard: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.primary,
    overflow: "hidden",
    ...getShadow("sm", theme),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.x3,
    padding: Spacing.x4,
  },
  rowDivider: {
    height: 1,
    marginStart: Spacing.x4 + Spacing.x11 + Spacing.x3,
    backgroundColor: COLORS[theme].border.subtle,
  },
  rowIcon: {
    width: Spacing.x11,
    height: Spacing.x11,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
});

export default styles;
