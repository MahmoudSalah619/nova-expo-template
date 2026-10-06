import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const AVATAR_SIZE = Spacing.x14 + Spacing.x6;

const styles = StyleSheet.create({
  screen: {
    gap: Spacing.x5,
    paddingBottom: Spacing.x14 * 2.5,
  },
  profileCard: {
    alignItems: "center",
    gap: Spacing.x1,
    padding: Spacing.x6,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.primary,
    ...getShadow("md", theme),
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.action,
    borderWidth: 4,
    borderColor: COLORS[theme].Surface.actionSoft,
    marginBottom: Spacing.x3,
  },
  email: {
    alignSelf: "stretch",
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
    paddingHorizontal: Spacing.x4,
    ...getShadow("sm", theme),
  },
  collapsibleItem: {
    paddingVertical: Spacing.x4,
  },
  collapsibleBody: {
    gap: Spacing.x1,
    paddingTop: Spacing.x1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS[theme].border.subtle,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.x3,
    paddingVertical: Spacing.x4,
  },
  settingIcon: {
    width: Spacing.x10,
    height: Spacing.x10,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
  settingText: {
    flex: 1,
  },
  segmented: {
    flexDirection: "row",
    padding: Spacing.x1,
    gap: Spacing.x1,
    borderRadius: Radius.sm,
    backgroundColor: COLORS[theme].Surface.subtle,
  },
  segment: {
    paddingHorizontal: Spacing.x3,
    paddingVertical: Spacing.x1,
    borderRadius: Radius.xs,
  },
  segmentActive: {
    backgroundColor: COLORS[theme].Surface.primary,
    ...getShadow("sm", theme),
  },
});

export default styles;
