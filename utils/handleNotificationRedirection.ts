import { NavigationProp } from "@react-navigation/native";
import { NotificationData, NotificationType } from "@/apis/@types/notification";

export default function handleNotificationRedirection(
  notificationData: NotificationData,
  navigation: NavigationProp<ReactNavigation.RootParamList>
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
