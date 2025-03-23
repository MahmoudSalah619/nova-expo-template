import React from "react";
import { Text, ThemedView } from "@/components/atoms";
import { useRoute } from "@react-navigation/native";

export default function Screen2() {
  const route = useRoute();
  const { from, id } = route.params as { from: string; id: number };
  console.log("name", from);
  console.log("id", id);

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <Text type="title">Screen2</Text>
      <Text>Props:-</Text>
      <Text>{`id: ${id}`}</Text>
      <Text>{`from: ${from}`}</Text>
    </ThemedView>
  );
}
