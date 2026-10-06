import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.x3,
    padding: Spacing.x4,
  },
  unread: {
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
  iconChip: {
    width: Spacing.x11,
    height: Spacing.x11,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  iconMessage: {
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
  iconSuccess: {
    backgroundColor: COLORS[theme].Surface.successSoft,
  },
  iconSecurity: {
    backgroundColor: COLORS[theme].Surface.dangerSoft,
  },
  iconPromo: {
    backgroundColor: COLORS[theme].Surface.subtle,
  },
  iconOnUnread: {
    backgroundColor: COLORS[theme].Surface.primary,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.x2,
  },
  title: {
    flex: 1,
  },
  unreadDot: {
    width: Spacing.x2,
    height: Spacing.x2,
    borderRadius: Radius.pill,
    backgroundColor: COLORS[theme].Surface.action,
  },
  time: {
    marginTop: Spacing.x1,
  },
});

export default styles;
