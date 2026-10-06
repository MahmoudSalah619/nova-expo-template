import { Icon, Text, ThemedView } from "@/components/shared/ui";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";
import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <View style={styles.iconChip}>
          <Icon name="compass" size={32} color="action" />
        </View>
        <Text variant="H2" isCentered>
          notFoundTitle
        </Text>
        <Text variant="md" color="body" isCentered>
          notFoundSubtitle
        </Text>
        <View style={styles.linkButton}>
          <Link href="/" style={styles.link}>
            <Text size={15} fontFamily="font600" color="onAction">
              goHome
            </Text>
          </Link>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.x2,
    padding: Spacing.x6,
  },
  iconChip: {
    width: Spacing.x14 + Spacing.x4,
    height: Spacing.x14 + Spacing.x4,
    borderRadius: Radius.xl,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.actionSoft,
    marginBottom: Spacing.x4,
  },
  linkButton: {
    marginTop: Spacing.x6,
    borderRadius: Radius.md,
    backgroundColor: COLORS[theme].Surface.action,
    ...getShadow("md", theme, "action"),
  },
  link: {
    paddingVertical: Spacing.x3,
    paddingHorizontal: Spacing.x6,
  },
});
