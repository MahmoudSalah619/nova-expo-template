import * as Updates from "expo-updates";
import { useEffect } from "react";
import { Alert } from "react-native";

export default function useCheckNewUpdates() {
  useEffect(() => {
    (async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          Alert.alert(
            "New Update!",
            "Please restart the app to apply updates",
            [
              {
                text: "Restart App",
                onPress: () => Updates.reloadAsync(),
              },
            ]
          );
        }
      } catch (e) {
        // error message
      }
    })();
  }, []);
}
