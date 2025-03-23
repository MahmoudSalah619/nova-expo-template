import { Text, ThemedView } from "@/components/atoms";
import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet } from "react-native";

export default function profile() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Button
        title="Go to Welcome Page (like a signout button)"
        onPress={() => router.replace("/(auth)/welcome")}
      />
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
