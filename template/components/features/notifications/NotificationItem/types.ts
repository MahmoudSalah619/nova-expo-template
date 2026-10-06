import { AppNotification } from "../types";

export interface NotificationItemProps {
  notification: AppNotification;
  onPress: (id: number) => void;
}
