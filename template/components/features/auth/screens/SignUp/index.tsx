import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import { Button, Checkbox, FormInput, Icon, Text } from "@/components/shared/ui";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import styles from "./styles";

const SignUp = () => {
  const { control } = useForm({});
  const router = useRouter();

  return (
    <ScreenWrapper showHeader={false} paddingSize="sm" isScrollable>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={router.back}>
            <View style={styles.backIcon}>
              <View style={GLOBAL_STYLES.flipInArabic}>
                <Icon name="chevronRight" size={20} color="primary" />
              </View>
            </View>
          </TouchableOpacity>
          <Text variant="H1">signUpTitle</Text>
          <Text variant="md" color="body">
            signUpSubtitle
          </Text>
        </View>

        <View style={styles.formCard}>
          <FormInput
            name="full_name"
            label="fullName"
            placeholder="fullNamePlaceholder"
            prefix={<Icon name="user" size={18} color="caption" />}
            control={control}
            required
          />
          <FormInput
            name="email"
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
            placeholder="passwordCreatePlaceholder"
            secureTextEntry
            prefix={<Icon name="lock" size={18} color="caption" />}
            control={control}
            required
          />
          <View style={styles.termsRow}>
            <Controller
              control={control}
              name="accept_terms"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  label="acceptTerms"
                  labelPosition="left"
                  size={20}
                  checked={!!value}
                  onPress={() => onChange(!value)}
                />
              )}
            />
          </View>
          <Button
            title="createAccount"
            onPress={() => router.replace("/(main)/(tabs)/Home")}
          />
        </View>

        <View style={styles.footer}>
          <Text variant="sm" color="body">
            alreadyHaveAccount
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text size={13} fontFamily="font700" color="primary">
              signIn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;
