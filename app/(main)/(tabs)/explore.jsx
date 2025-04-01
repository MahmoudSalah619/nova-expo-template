import React from "react";
import { Button, Text, ThemedView } from "@/components/atoms";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SheetManager } from "react-native-actions-sheet";
const Explore = () => {
  const router = useRouter();
  const handleOpenActionSheet = async () => {
    const payload = await SheetManager.show("random-bottom-sheet", {
      payload: { title: "Random Sheet" },
    });
    console.log(payload);
    if (payload.decision) {
      // Do something with the decision
    } else {
      // Do something else
    }
  };
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Button title="Open ActionSheet" onPress={handleOpenActionSheet} />
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
