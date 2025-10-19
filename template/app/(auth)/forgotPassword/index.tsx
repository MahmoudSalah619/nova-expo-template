import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AuthScreenWrapper from "@/components/templates/AuthScreenWrapper";
import { Text } from "@/components/atoms";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import OtpInputs from "react-native-otp-molecule";

const ForgotPassword = () => {
  const router = useRouter();

  return (
    <AuthScreenWrapper justifyContent="space-between" isScrollable>
      <View>
        <OtpInputs
          inputsCount={6}
          inputStyle={{ height: 50 }}
          onSubmit={(otp: string, complete: boolean) => {
            console.log(otp, complete);
          }}
          placeHolderTextColor="#ccc"
          // secureEntry
        />
      </View>
      <View style={[GLOBAL_STYLES.rowCenter, GLOBAL_STYLES.gap4]}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text weight={600} color="primary">
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </AuthScreenWrapper>
  );
};

export default ForgotPassword;
