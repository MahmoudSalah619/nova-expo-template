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
  greeting: {
    gap: Spacing.x1,
  },
  hero: {
    backgroundColor: COLORS[theme].Surface.action,
    borderRadius: Radius.xxl,
    padding: Spacing.x6,
    gap: Spacing.x2,
    overflow: "hidden",
    ...getShadow("lg", theme, "action"),
  },
  heroOrb: {
    top: -Spacing.x14,
    end: -Spacing.x14,
  },
  heroOrbSmall: {
    bottom: -Spacing.x10,
    start: Spacing.x14 * 2,
  },
  heroBody: {
    opacity: 0.85,
  },
  heroCta: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.x2,
    marginTop: Spacing.x3,
    paddingHorizontal: Spacing.x4,
    paddingVertical: Spacing.x2,
    borderRadius: Radius.pill,
    backgroundColor: COLORS[theme].Surface.primary,
  },
  section: {
    gap: Spacing.x3,
  },
  sectionLabel: {
    letterSpacing: 1.2,
    marginStart: Spacing.x1,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.x3,
  },
  actionCardWrapper: {
    flexBasis: "47%",
    flexGrow: 1,
  },
  actionCard: {
    flex: 1,
    gap: Spacing.x3,
    padding: Spacing.x4,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.primary,
    ...getShadow("sm", theme),
  },
  actionIcon: {
    width: Spacing.x10,
    height: Spacing.x10,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
});

export default styles;
