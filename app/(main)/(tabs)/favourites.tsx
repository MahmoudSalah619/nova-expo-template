import Text from "@/components/atoms/Text";
import View from "@/components/atoms/View";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Button } from "react-native";

const Favourites = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text type="default" color="primary">
        Favourites
      </Text>
      <Button
        title="Go to Home"
        onPress={() => router.navigate("/(main)/screen1")}
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

export default Favourites;
