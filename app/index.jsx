import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import useInitialRouting from "../hooks/useInitialRouting";
import UseLoadResources from "../hooks/useLoadResources";

const InitialScreen = () => {
  const { isReady } = UseLoadResources();
  const { isLoading } = useInitialRouting(isReady);

  // Show a loading indicator while checking auth state
  if (isLoading) {
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
