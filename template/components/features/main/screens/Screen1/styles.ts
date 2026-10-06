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
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.x3,
    padding: Spacing.x4,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.primary,
    ...getShadow("sm", theme),
  },
  iconChip: {
    width: Spacing.x11,
    height: Spacing.x11,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
  cardText: {
    flex: 1,
    gap: 2,
  },
});

export default styles;
