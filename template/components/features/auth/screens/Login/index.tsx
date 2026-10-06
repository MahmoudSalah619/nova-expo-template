import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import { Controller, useForm } from "react-hook-form";
import { Checkbox, FormInput, Icon } from "@/components/shared/ui";
import { Button, SeperateLine, Text } from "@/components/shared/ui";
import GoogleRegisterationButton from "@/components/features/auth/components/social/GoogleRegisterationButton";
import FacebookRegisterationButton from "@/components/features/auth/components/social/FacebookRegisterationButton";
import AppleRegistarationButton from "@/components/features/auth/components/social/AppleRegistarationButton";
import Biometric from "@/components/features/auth/components/biometric";
import styles from "./styles";

const Login = () => {
  const { control } = useForm({});
  const router = useRouter();

  return (
    <ScreenWrapper showHeader={false} paddingSize="sm" isScrollable>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.brandMark}>
            <Icon name="zap" size={24} color="onAction" />
          </View>
          <Text variant="H1">loginTitle</Text>
          <Text variant="md" color="body">
            loginSubtitle
          </Text>
        </View>

        <View style={styles.formCard}>
          <FormInput
            name="username"
            label="email"
            placeholder="emailPlaceholder"
            keyboardType="email-address"
            prefix={<Icon name="mail" size={18} color="caption" />}
            control={control}
            required
          />
          <FormInput
            name="password"
            label="password"
            placeholder="passwordPlaceholder"
            secureTextEntry
            prefix={<Icon name="lock" size={18} color="caption" />}
            control={control}
            required
          />
          <View style={styles.optionsRow}>
            <Controller
              control={control}
              name="remember_me"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  label="rememberMe"
                  labelPosition="left"
                  size={20}
                  checked={!!value}
                  onPress={() => onChange(!value)}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgotPassword")}
            >
              <Text size={13} fontFamily="font600" color="primary">
                forgotPassword
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            title="signIn"
            onPress={() => router.replace("/(main)/(tabs)/Home")} // Navigate to the home page and replace the current route
          />
          <Biometric />
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine}>
            <SeperateLine />
          </View>
          <Text variant="xsm" color="caption">
            orContinueWith
          </Text>
          <View style={styles.dividerLine}>
            <SeperateLine />
          </View>
        </View>

        <View style={styles.socialList}>
          <AppleRegistarationButton />
          <GoogleRegisterationButton />
          <FacebookRegisterationButton />
        </View>

        <View style={styles.footer}>
          <Text variant="sm" color="body">
            noAccount
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text size={13} fontFamily="font700" color="primary">
              signUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;
