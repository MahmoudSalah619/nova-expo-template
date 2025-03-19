import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import useSplashAndFonts from "../hooks/useSplashAndFonts";
import useInitialRouting from "../hooks/useInitialRouting";

const InitialScreen = () => {
  const { isReady } = useSplashAndFonts();
  const { isLoading } = useInitialRouting(isReady);
  console.log("InitialScreen");

  // Show a loading indicator while checking auth state or loading fonts
  if (isLoading || !isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null; // The screen will redirect based on routing logic
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InitialScreen;
