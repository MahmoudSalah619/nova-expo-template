import { iconsListType } from "@/@types/mainTypes";

export type NotificationType = "message" | "success" | "security" | "promo";
export type NotificationGroup = "today" | "earlier";

export interface AppNotification {
  id: number;
  type: NotificationType;
  group: NotificationGroup;
  /** Translation keys */
  title: string;
  body: string;
  time: string;
  isRead: boolean;
}

export interface NotificationTypeStyle {
  icon: iconsListType;
}
