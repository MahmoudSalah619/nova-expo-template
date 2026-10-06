import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  screen: {
    gap: Spacing.x5,
    paddingBottom: Spacing.x10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.x3,
  },
  headerText: {
    flex: 1,
    gap: Spacing.x1,
  },
  markAllButton: {
    paddingVertical: Spacing.x1,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.x2,
    paddingVertical: Spacing.x2,
    borderRadius: Radius.sm,
  },
  segmentActive: {
    backgroundColor: COLORS[theme].Surface.primary,
    ...getShadow("sm", theme),
  },
  countBadge: {
    minWidth: Spacing.x5,
    paddingHorizontal: Spacing.x1 + 2,
    height: Spacing.x5,
    borderRadius: Radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.action,
  },
  section: {
    gap: Spacing.x3,
  },
  sectionLabel: {
    letterSpacing: 1.2,
    marginStart: Spacing.x1,
  },
  listCard: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.primary,
    overflow: "hidden",
    ...getShadow("sm", theme),
  },
  divider: {
    height: 1,
    backgroundColor: COLORS[theme].border.subtle,
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
    backgroundColor: COLORS[theme].Surface.actionSoft,
    marginBottom: Spacing.x3,
  },
});

export default styles;
