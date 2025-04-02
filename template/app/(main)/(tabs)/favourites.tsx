import { Input, Text, ThemedView } from "@/components/atoms";
import React from "react";
import { StyleSheet } from "react-native";

const Favourites = () => {
  return (
    <ThemedView style={styles.container}>
      <Text color="primary">Favourites</Text>
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
