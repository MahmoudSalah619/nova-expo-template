import React from "react";
import { Button, Text, ThemedView } from "@/components/atoms";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function Screen2() {
  const route = useRoute();
  const router = useRouter();
  const { from, id } = route.params as { from: string; id: number };
  console.log("name", from);
  console.log("id", id);

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <Text type="title">Screen2</Text>
      <Button title="Go to Screen3" onPress={() => router.push("/(main)/screen3") } />
      <Text>Props:-</Text>
      <Text>{`id: ${id}`}</Text>
      <Text>{`from: ${from}`}</Text>
    </ThemedView>
  );
}
