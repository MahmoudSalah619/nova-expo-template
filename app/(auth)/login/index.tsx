import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AuthScreenWrapper from "@/components/templates/AuthScreenWrapper";
import { Controller, useForm } from "react-hook-form";
import { Checkbox, FormInput } from "@/components/molecules/common";
import { Button, SeperateLine, Text } from "@/components/atoms";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import GoogleRegisterationButton from "@/components/organisms/scoped/auth/social/GoogleRegisterationButton";
import FacebookRegisterationButton from "@/components/organisms/scoped/auth/social/FacebookRegisterationButton";
import AppleRegistarationButton from "@/components/organisms/scoped/auth/social/AppleRegistarationButton";
import Biometric from "@/components/organisms/scoped/auth/biometric";

const Login = () => {
  const { control, handleSubmit } = useForm({});
  const router = useRouter(); // Get the router instance from expo-router

  return (
    <AuthScreenWrapper justifyContent="space-between" isScrollable>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Login Page</Text> */}
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
              <Text color="black" size={12}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="Login"
          onPress={() => router.replace("/(main)/(tabs)/home")} // Navigate to the home page and replace the current route
        />
      </View>
      <Biometric />
      <SeperateLine />
      <View style={GLOBAL_STYLES.gap8}>
        <AppleRegistarationButton />
        <GoogleRegisterationButton />
        <FacebookRegisterationButton />
      </View>
      <View style={[GLOBAL_STYLES.rowcenter, GLOBAL_STYLES.gap4]}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text weight={600} color="primary" style={styles.underlined}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </AuthScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
  underlined: {
    textDecorationLine: "underline",
  },
});

export default Login;
