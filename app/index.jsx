import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import useInitialRouting from "../hooks/useInitialRouting";
import { Redirect } from "expo-router";

const InitialScreen = () => {
  const { targetPath } = useInitialRouting();

  // Show a loading indicator while checking auth state
  if (!targetPath) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // The screen will redirect based on routing logic
  return <Redirect href={targetPath} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InitialScreen;
