import React from "react";
import { Button, Text, ThemedView, } from "@/components/atoms";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
const Explore = () => {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Explore</Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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

export default Explore;
