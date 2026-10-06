import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.x4,
    backgroundColor: COLORS[theme].Surface.bg,
  },
  listHeader: {
    gap: Spacing.x1,
    paddingTop: Spacing.x4,
    marginBottom: Spacing.x4,
  },
  card: {
    padding: Spacing.x4,
    borderRadius: Radius.lg,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.x3,
  },
  indexChip: {
    width: Spacing.x10,
    height: Spacing.x10,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
  cardTitle: {
    flex: 1,
  },
  cardBody: {
    gap: Spacing.x3,
    marginTop: Spacing.x3,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.x1,
  },
});

export default styles;
