import { ErrorBoundaryProps } from "expo-router";
import { StyleSheet, View } from "react-native";

// Direct imports (not the ui barrel) keep this error screen light and testable.
import Button from "@/components/shared/ui/Button";
import Icon from "@/components/shared/ui/Icon";
import Text from "@/components/shared/ui/Text/Base";
import ThemedView from "@/components/shared/ui/ThemedView";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";
import reloadApp from "@/utils/reloadApp";

/**
 * Shown in place of a screen that threw while rendering, so one broken screen
 * doesn't take down the whole app. Registered for every route through
 * `unstable_settings.screenErrorBoundary` in `app/_layout.tsx`.
 *
 * The button restarts the app, so startup routing runs again and lands the user
 * on a safe screen: home if signed in, login if not.
 *
 * Catches render errors only. Errors in event handlers, async code, or native
 * crashes don't reach React error boundaries.
 */
export default function ScreenErrorFallback({ error }: ErrorBoundaryProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.iconChip}>
        <Icon name="zap" size={32} color="danger" />
      </View>
      <Text variant="H2" isCentered>
        SCREEN_ERROR_TITLE
      </Text>
      {/* Dev-only: the real error, to speed up debugging. Hidden in release builds. */}
      {__DEV__ && (
        <Text variant="sm" color="danger" isCentered>
          {error.message}
        </Text>
      )}
      <View style={styles.actions}>
        <Button title="RELOAD_APP" onPress={reloadApp} />
      </View>
    </ThemedView>
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
    backgroundColor: COLORS[theme].Surface.dangerSoft,
    marginBottom: Spacing.x4,
  },
  actions: {
    alignSelf: "stretch",
    marginTop: Spacing.x6,
  },
});
