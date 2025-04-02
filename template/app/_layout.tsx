import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { View } from "react-native";
import { Provider } from "react-redux";
import store from "@/redux";
import { SheetProvider } from "react-native-actions-sheet";
import Toast from "react-native-toast-message";
import UseLoadResources from "@/hooks/useLoadResources";

/**
 * RootLayout component that defines the main layout of the application.
 * It includes the StatusBar and the Stack navigator for handling different screens and routes.
 */

const RootLayout = () => {
  UseLoadResources();

  return (
    <AppProviders>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
    </AppProviders>
  );
};

const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaInsetsContext.Consumer>
    {(insets) => (
      <View style={{ flex: 1, paddingTop: insets?.top }}>
        <StatusBar style="dark" backgroundColor="transparent" />
        <Provider store={store}>
          <SheetProvider>
            <Toast />

            {children}
          </SheetProvider>
        </Provider>
      </View>
    )}
  </SafeAreaInsetsContext.Consumer>
);

export default RootLayout;
