import FingerPrint from "@/assets/icons/FingerPrint";
import { Button } from "@/components/atoms";
import useBiometricLogin from "@/hooks/useBiometricLogin";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

export default function Biometric() {
  const router = useRouter();
  const { isBiometricSupported, isAuthenticated, runBiometric } =
    useBiometricLogin();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/(main)/(tabs)/home");
    }
  }, [isAuthenticated]);

  return (
    <View>
      {isBiometricSupported && (
        <Button
          onPress={runBiometric}
          prefix={<FingerPrint />}
          title={"Biometric Login"}
        />
      )}
    </View>
  );
}
