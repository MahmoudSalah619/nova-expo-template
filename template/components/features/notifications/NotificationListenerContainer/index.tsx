import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import useNotificationsToken from "@/hooks/useNotificationsToken";
import handleNotificationRedirection from "@/utils/handleNotificationRedirection";
import { NotificationData } from "@/apis/@types/notification";
import { useNavigation } from "expo-router";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationListnerContainer() {
  const navigation = useNavigation();

  const notificationListener = useRef<Notifications.Subscription | undefined>();
  const responseListener = useRef<Notifications.Subscription | undefined>();

  // GETTING NOTIFICATION DEVICE TOKEN
  const deviceToken = useNotificationsToken();
  useEffect(() => {
    if (!deviceToken) return;
    // eslint-disable-next-line no-console
    console.log("DEVICE TOKEN =>", deviceToken);
  }, [deviceToken]);

  // LISTNERS FOR NOTIFICATIONS
  useEffect(() => {
    // Getting notification
    notificationListener.current =
      Notifications.addNotificationReceivedListener(() => {
        // nothing here
      });

    // Opening notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const notificationData = response?.notification.request.content
          .data as NotificationData;
        // @ts-ignore
        handleNotificationRedirection(notificationData, navigation);
      });

    return () => {
      if (notificationListener?.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }

      if (responseListener?.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  // FOR OPENING NOTIFICATION WHILE CLOSE APP
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  useEffect(() => {
    if (!lastNotificationResponse) return;

    const notificationData = lastNotificationResponse?.notification.request
      .content.data as NotificationData;
    // @ts-ignore
    handleNotificationRedirection(notificationData, navigation);
  }, [lastNotificationResponse]);

  return null;
}
