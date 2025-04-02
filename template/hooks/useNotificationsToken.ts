import { Platform } from "react-native";
import { useState } from "react";
import * as Notifications from "expo-notifications";

async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  let isAllowed =
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;

  if (isAllowed) return isAllowed;

  const finalSettings = await Notifications.requestPermissionsAsync();
  isAllowed =
    finalSettings.granted ||
    finalSettings.ios?.status ===
      Notifications.IosAuthorizationStatus.PROVISIONAL;
  return isAllowed;
}

export default function useNotificationsToken() {
  const [deviceToken, setDeviceToken] = useState<string | null>(null);

  (async () => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const isAllowed = await allowsNotificationsAsync();
    if (!isAllowed) {
      // alert('Failed to get push token for push notification!');
      return null;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    setDeviceToken(token);

    return null;
  })();

  return deviceToken;
}
