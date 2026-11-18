import React, { useCallback, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "@/redux";
import { SheetProvider } from "react-native-actions-sheet";
import Toast from "react-native-toast-message";
import useCheckNewUpdates from "@/hooks/useCheckNewUpdate";
// import NotificationListenerContainer from "@/components/features/notifications/NotificationListenerContainer";
import useLoadResources from "@/hooks/useLoadResources";
import useThemeSync from "@/hooks/useThemeSync";
import { COLORS } from "@/constants/Colors";
import { theme } from "@/utils/getTheme";
import AnimatedSplash from "@/components/shared/layout/AnimatedSplash";
import ScreenErrorFallback from "@/components/shared/layout/ScreenErrorFallback";

/**
 * If a screen throws while rendering, show ScreenErrorFallback in its place
 * (with "Try again" and "Back to home") instead of crashing the whole app.
 * Applies to every route below this layout. SDK 58 API, still `unstable_`.
 */
export const unstable_settings = {
  screenErrorBoundary: ScreenErrorFallback,
};
/**
 * EAS Observe (performance monitoring), disabled by default.
 *
 * ⚠️ Requires a development build. expo-observe ships native code, so it does
 * NOT work in Expo Go, and importing it there crashes on launch
 * ("Cannot find native module 'ExpoObserve'").
 *
 * To enable:
 *  1. Make sure `extra.eas.projectId` is set in app.json (run `eas init`).
 *  2. Uncomment the three Observe blocks in this file (import, markInteractive, wrap)
 *     and add `useEffect` to the "react" import.
 *  3. Rebuild the dev client: `npm run build:dev` or `npx expo run:android|ios`.
 *     A dev build made before enabling this will also crash. Rebuild it once.
 *  4. Metrics appear in the Observe tab of the EAS dashboard.
 *
 * Docs: https://docs.expo.dev/versions/latest/sdk/observe/
 */
// import { ObserveRoot, useObserve } from "expo-observe";

/**
 * RootLayout component that defines the main layout of the application.
 * It includes the StatusBar and the Stack navigator for handling different screens and routes.
 */

const RootLayout = () => {
  // Load resources such as fonts, and handlers
  const { isLoaded } = useLoadResources();
  // Check for new updates
  useCheckNewUpdates();
  // Restore the saved theme and follow system theme changes
  useThemeSync();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const hideSplash = useCallback(() => setIsSplashVisible(false), []);

  // EAS Observe: record "time to interactive" once the splash is gone.
  // Only the first call per session counts. See the setup note at the top.
  // const { markInteractive } = useObserve();
  // useEffect(() => {
  //   if (!isSplashVisible) markInteractive();
  // }, [isSplashVisible, markInteractive]);

  return (
    <View style={styles.root}>
      <AppProviders>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
      </AppProviders>
      {/* Rendered outside the safe-area padding so it covers the full screen like the native splash */}
      {isSplashVisible && (
        <AnimatedSplash isReady={isLoaded} onFinish={hideSplash} />
      )}
    </View>
  );
};

const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaInsetsContext.Consumer>
    {(insets) => (
      <View
        style={{
          flex: 1,
          paddingTop: insets?.top,
          backgroundColor: COLORS[theme].Surface.bg,
        }}
      >
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
        <Provider store={store}>
          <KeyboardProvider>
            <SheetProvider>
              {/* <NotificationListnerContainer /> */}
              <Toast />

              {children}
            </SheetProvider>
          </KeyboardProvider>
        </Provider>
      </View>
    )}
  </SafeAreaInsetsContext.Consumer>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS[theme].Surface.bg,
  },
});

export default RootLayout;
// EAS Observe: replace the export above with this (requires a development build):
// export default ObserveRoot.wrap(RootLayout);
