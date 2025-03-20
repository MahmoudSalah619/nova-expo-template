import { Button, Text, ThemedView } from "@/components/atoms";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const Favourites = () => {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <Text type="default" color="primary">
        Favourites
      </Text>
      <Button
        title="Go to Home"
        onPress={() => router.navigate("/(main)/screen1")}
      />
      <Button
        title="Go to Home"
        onPress={() => router.navigate("/(main)/screen1")}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Favourites;
