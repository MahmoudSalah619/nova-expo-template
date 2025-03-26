import React from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button, Text } from "@/components/atoms";
import AuthScreenWrapper from "@/components/templates/AuthScreenWrapper";

const Welcome = () => {
  const router = useRouter();

  return (
    <AuthScreenWrapper style={styles.container}>
      <Text style={styles.title}>Welcome to Nova</Text>
      <Text>
        A sleek and modern mobile template designed for seamless user
        experiences. Fast, responsive, and customizable—Nova is your perfect
        starting point for building intuitive mobile applications.
      </Text>
      <Button
        title="Go to Signup"
        onPress={() => router.push("/(auth)/signup")}
      />
      <Button
        title="Go to Login"
        onPress={() => router.push("/(auth)/login")}
      />
    </AuthScreenWrapper>
  );
};

/**
 * Styles for the Welcome component.
 */
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
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
