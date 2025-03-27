import { useState, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import useAutoCompleteTranslation from "./useAutoCompleteTranslation";
import HandleErrors from "@/utils/handleErrors";

const useBiometricLogin = () => {
  const { t } = useAutoCompleteTranslation();
  const [isBiometricSupported, setIsBiometricSupported] =
    useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkDeviceForBiometrics = async () => {
      const support = await LocalAuthentication.hasHardwareAsync(); // check if Biometric in device
      setIsBiometricSupported(support);
    };
    checkDeviceForBiometrics();
  }, []);

  const runBiometric = async () => {
    try {
      const biometricRecords = await LocalAuthentication.isEnrolledAsync(); // check if Biometric setup in device
      if (!biometricRecords) {
        return;
      }

      const data = await LocalAuthentication.authenticateAsync({
        // call Biometric
        promptMessage: t("AUTHENTICATION_WITH_BIOMETRICS"),
      });

      if (data?.success) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
      HandleErrors(error);
    }
  };

  return {
    isBiometricSupported,
    isAuthenticated,
    runBiometric,
  };
};

export default useBiometricLogin;
