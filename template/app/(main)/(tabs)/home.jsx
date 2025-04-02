import { Link, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView, Button } from "@/components/atoms";
const Home = () => {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <Button
        title="Go to Screen 1"
        onPress={() => router.push("/(main)/screen1")}
      />
      <Button
        title="Go to Screen 2 with props"
        onPress={() =>
          // router.push(`/(main)/screen2/${{ id: 1, from: "Button" }}`)
          router.push({
            pathname: "/(main)/screen2",
            params: { id: 1, from: "Button" },
          })
        }
      />
      <Button title={"suiiiiiiiiiii"} variant="outlined" />
      <View>
        <Button title={"suiiiiiiiiiii"} variant="underlined" />
      </View>
      <Link href="/(main)/screen1">About</Link>
      <Link
        href={{
          pathname: "/(main)/screen2",
          params: { id: 2, from: "Link" },
        }}
      >
        View user (with params)
      </Link>
      {/* <Button
        title="Go to Welcome"
        onPress={() => router.push("/(main)/screen1")}
      /> */}
    </ThemedView>
  );
};

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

export default Home;
