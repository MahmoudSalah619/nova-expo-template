import { AppNotification, NotificationGroup, NotificationType, NotificationTypeStyle } from "./types";

export const NOTIFICATION_TYPE_ICONS: Record<NotificationType, NotificationTypeStyle> = {
  message: { icon: "mail" },
  success: { icon: "check" },
  security: { icon: "shield" },
  promo: { icon: "star" },
};

export const NOTIFICATION_GROUPS: { key: NotificationGroup; label: string }[] = [
  { key: "today", label: "notificationsToday" },
  { key: "earlier", label: "notificationsEarlier" },
];

// Dummy data for demonstrating the notifications screen in the template
export const DUMMY_NOTIFICATIONS: AppNotification[] = [
  { id: 1, type: "message", group: "today", title: "notif1Title", body: "notif1Body", time: "notif1Time", isRead: false },
  { id: 2, type: "success", group: "today", title: "notif2Title", body: "notif2Body", time: "notif2Time", isRead: false },
  { id: 3, type: "security", group: "today", title: "notif3Title", body: "notif3Body", time: "notif3Time", isRead: true },
  { id: 4, type: "promo", group: "earlier", title: "notif4Title", body: "notif4Body", time: "notif4Time", isRead: true },
  { id: 5, type: "message", group: "earlier", title: "notif5Title", body: "notif5Body", time: "notif5Time", isRead: true },
  { id: 6, type: "success", group: "earlier", title: "notif6Title", body: "notif6Body", time: "notif6Time", isRead: true },
];
