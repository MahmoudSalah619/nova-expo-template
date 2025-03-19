import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

const Welcome = () => {
  const router = useRouter();  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Page</Text>
      <Button title="Go to Signup" onPress={() => router.push("/(auth)/signup")} />
      <Button title="Go to Login" onPress={() => router.push("/(auth)/login")} />
    </View>
  );
};

/**
 * Styles for the Welcome component.
 */
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
});

export default Welcome;
