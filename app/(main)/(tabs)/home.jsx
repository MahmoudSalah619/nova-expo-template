import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Button } from "react-native";
import View from "@/components/atoms/View";

const Home = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Button
        title="Go to Welcome"
        onPress={() => router.push("/(main)/screen1")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Home;
