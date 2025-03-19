import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

/**
 * RootLayout component that defines the main layout of the application.
 * It includes the StatusBar and the Stack navigator for handling different screens and routes.
 */

const RootLayout = () => {
  console.log("RootLayout");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" backgroundColor="transparent" />

        <Stack>
          <Stack.Screen
            name="index" // This is the main index.tsx screen
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RootLayout;
