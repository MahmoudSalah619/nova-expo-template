import { NotificationData, NotificationType } from "@/apis/@types/notification";

export default function handleNotificationRedirection(
  notificationData: NotificationData,
  navigation: { navigate: (name: string, params?: object) => void }
) {
  console.log(notificationData, "NOTIFICATION DATA");

  // #### Create Order Notification ####
  if (notificationData?.template_slug === NotificationType.NEW_ORDER) {
    const productId = notificationData?.target_object_id;

    if (productId) {
      // @ts-ignore
      navigation.navigate("ProductDetailsScreen", { productId });
    }
  }
}
