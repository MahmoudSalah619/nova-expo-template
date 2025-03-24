import { Button, Input, Text, ThemedView } from "@/components/atoms";
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
      <Input
        placeholder="Enter your name"
        onChange={(e) => console.log(e, "eeeeeeeeee")}
      />
      <Input
        placeholder="Search"
        isSearch
        onChange={(e) => console.log(e, "eeeeeeeeee")}
      />
      <Input placeholder="password" label="Suiiiiiiii" secureTextEntry />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Favourites;
