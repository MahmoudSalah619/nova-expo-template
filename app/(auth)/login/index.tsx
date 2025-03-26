import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AuthScreenWrapper from "@/components/templates/AuthScreenWrapper";
import { Controller, useForm } from "react-hook-form";
import { Checkbox, FormInput } from "@/components/molecules/common";
import { Button, Text } from "@/components/atoms";
import GLOBAL_STYLES from "@/constants/GlobalStyles";

const Login = () => {
  const { control, handleSubmit } = useForm({});
  const router = useRouter(); // Get the router instance from expo-router

  return (
    <AuthScreenWrapper justifyContent="center">
      <View style={styles.container}>
        <Text style={styles.title}>Login Page</Text>
        <View style={{ marginBottom: 24 }}>
          <FormInput
            name="username"
            placeholder="Email"
            control={control}
            required
          />
          <FormInput
            name="password"
            placeholder="Password"
            control={control}
            required
          />
          <View style={GLOBAL_STYLES.rowJustifyBetween}>
            <Controller
              control={control}
              name="remember_me"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  label="Remember me"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <TouchableOpacity>
              <Text color="black" type="link">Forgot your password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="Login"
          onPress={() => router.replace("/(main)/(tabs)/home")} // Navigate to the home page and replace the current route
        />
      </View>
    </AuthScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
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
