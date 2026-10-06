import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  header: {
    gap: Spacing.x1,
    marginBottom: Spacing.x2,
  },
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.primary,
    paddingHorizontal: Spacing.x4,
    ...getShadow("sm", theme),
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.x2,
    paddingVertical: Spacing.x3,
  },
  paramRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.x3,
    borderTopWidth: 1,
    borderTopColor: COLORS[theme].border.subtle,
  },
  valuePill: {
    paddingHorizontal: Spacing.x3,
    paddingVertical: Spacing.x1,
    borderRadius: Radius.pill,
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
  action: {
    marginTop: Spacing.x2,
  },
});

export default styles;
