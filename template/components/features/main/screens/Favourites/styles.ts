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
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.x2,
  },
  chip: {
    paddingHorizontal: Spacing.x4,
    paddingVertical: Spacing.x2,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.primary,
  },
  chipActive: {
    borderColor: COLORS[theme].Surface.action,
    backgroundColor: COLORS[theme].Surface.action,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.x3,
  },
  cardWrapper: {
    flexBasis: "47%",
    flexGrow: 1,
  },
  card: {
    flex: 1,
    gap: Spacing.x3,
    padding: Spacing.x4,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.primary,
    ...getShadow("sm", theme),
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  iconTile: {
    width: Spacing.x12,
    height: Spacing.x12,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  tileAction: {
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
  tileSuccess: {
    backgroundColor: COLORS[theme].Surface.successSoft,
  },
  tileDanger: {
    backgroundColor: COLORS[theme].Surface.dangerSoft,
  },
  tileNeutral: {
    backgroundColor: COLORS[theme].Surface.subtle,
  },
  heartButton: {
    width: Spacing.x9,
    height: Spacing.x9,
    borderRadius: Radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.subtle,
  },
  heartButtonActive: {
    backgroundColor: COLORS[theme].Surface.dangerSoft,
  },
  cardText: {
    gap: 2,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.x1,
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
});

export default styles;
