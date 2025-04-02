import { useEffect } from "react";
import { Alert, Linking } from "react-native";
import IMPORTANT_VARS from "@/constants/ImportantVars";

export default function useCheckingForcedStoreUpdate() {
  const lockUntillUpdateFromStore = () => {
    Alert.alert(
      "An update is required!",
      "Please update to the latest version from store",
      [
        {
          text: "Go To Store",
          onPress: () => Linking.openURL(IMPORTANT_VARS.androidStoreLink),
        },
      ]
    );
  };

  useEffect(() => {
    if (IMPORTANT_VARS.forceStoreUpdate) {
      lockUntillUpdateFromStore();
    }
  }, []);
}
