import React, { useCallback, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "@/redux";
import { SheetProvider } from "react-native-actions-sheet";
import Toast from "react-native-toast-message";
import useCheckNewUpdates from "@/hooks/useCheckNewUpdate";
// import NotificationListenerContainer from "@/components/features/notifications/NotificationListenerContainer";
import useLoadResources from "@/hooks/useLoadResources";
import { COLORS } from "@/constants/Colors";
import { theme } from "@/utils/getTheme";
import AnimatedSplash from "@/components/shared/layout/AnimatedSplash";

/**
 * RootLayout component that defines the main layout of the application.
 * It includes the StatusBar and the Stack navigator for handling different screens and routes.
 */

const RootLayout = () => {
  // Load resources such as fonts, and handlers
  const { isLoaded } = useLoadResources();
  // Check for new updates
  useCheckNewUpdates();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const hideSplash = useCallback(() => setIsSplashVisible(false), []);

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
          <SheetProvider>
            {/* <NotificationListnerContainer /> */}
            <Toast />

            {children}
          </SheetProvider>
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
