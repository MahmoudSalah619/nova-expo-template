import FingerPrint from "@/assets/icons/FingerPrint";
import { Button } from "@/components/shared/ui";
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
      router.push("/(main)/(tabs)/Home");
    }
  }, [isAuthenticated]);

  return (
    <View>
      {isBiometricSupported && (
        <Button
          variant="outlined"
          onPress={runBiometric}
          prefix={<FingerPrint />}
          title={"Biometric Login"}
        />
      )}
    </View>
  );
}
