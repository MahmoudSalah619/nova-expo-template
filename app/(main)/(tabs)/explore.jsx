import React from "react";
import View from "@/components/atoms/View";
import Text from "@/components/atoms/Text";
import { StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
const Explore = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Button
        title="Go to Welcome Page (like a signout button)"
        onPress={() => router.replace("/(auth)/welcome")}
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
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
});

export default Explore;
