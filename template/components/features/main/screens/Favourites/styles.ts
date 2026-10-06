import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  screen: {
    gap: Spacing.x5,
    paddingBottom: Spacing.x14 * 2.5,
  },
  header: {
    gap: Spacing.x1,
  },
  segmented: {
    flexDirection: "row",
    padding: Spacing.x1,
    gap: Spacing.x1,
    borderRadius: Radius.md,
    backgroundColor: COLORS[theme].Surface.subtle,
  },
  segment: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.x2,
    borderRadius: Radius.sm,
  },
  segmentActive: {
    backgroundColor: COLORS[theme].Surface.primary,
    ...getShadow("sm", theme),
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
  },
  tilePlaces: {
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
  tileProducts: {
    backgroundColor: COLORS[theme].Surface.successSoft,
  },
  tileArticles: {
    backgroundColor: COLORS[theme].Surface.subtle,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  heartButton: {
    width: Spacing.x9,
    height: Spacing.x9,
    borderRadius: Radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.dangerSoft,
  },
  emptyState: {
    alignItems: "center",
    gap: Spacing.x2,
    paddingVertical: Spacing.x14,
  },
  emptyIcon: {
    width: Spacing.x14 + Spacing.x4,
    height: Spacing.x14 + Spacing.x4,
    borderRadius: Radius.xl,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.dangerSoft,
    marginBottom: Spacing.x3,
  },
  restoreButton: {
    marginTop: Spacing.x4,
  },
});

export default styles;
