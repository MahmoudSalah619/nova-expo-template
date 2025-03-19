import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter(); // Get the router instance from expo-router

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <Button
        title="Login Successfully (based on successful login process)"
        onPress={() => router.replace("/(tabs)/home")} // Navigate to the home page and replace the current route
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

export default Login;
