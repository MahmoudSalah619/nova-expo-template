import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import OtpInputs from "react-native-otp-molecule";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import { Button, Icon, Text } from "@/components/shared/ui";
import { COLORS } from "@/constants/Colors";
import { theme } from "@/utils/getTheme";
import styles from "./styles";

const OTP_LENGTH = 6;

const ForgotPassword = () => {
  const router = useRouter();

  return (
    <ScreenWrapper showHeader={false} paddingSize="sm" isScrollable>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconChip}>
              <Icon name="shield" size={30} color="action" />
            </View>
            <Text variant="H1">VERIFY_EMAIL_TITLE</Text>
            <Text variant="md" color="body">
              VERIFY_EMAIL_SUBTITLE
            </Text>
          </View>

          <View style={styles.card}>
            <OtpInputs
              inputsCount={OTP_LENGTH}
              inputStyle={styles.otpInput}
              inputFocusedStyle={styles.otpInputFocused}
              inputFilledStyle={styles.otpInputFilled}
              onSubmit={(otp: string, complete: boolean) => {
                console.log(otp, complete);
              }}
              placeHolderTextColor={COLORS[theme].text.disabled}
            />
            <Button title="VERIFY" onPress={() => router.replace("/(auth)/login")} />
            <View style={styles.resendRow}>
              <Text variant="sm" color="body">
                RESEND_CODE_PROMPT
              </Text>
              <TouchableOpacity>
                <Text size={13} fontFamily="font700" color="primary">
                  RESEND_CODE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text variant="sm" color="body">
            NO_ACCOUNT_PROMPT
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text size={13} fontFamily="font700" color="primary">
              SIGN_UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ForgotPassword;
