import { AppNotification, NotificationGroup, NotificationType, NotificationTypeStyle } from "./types";

export const NOTIFICATION_TYPE_ICONS: Record<NotificationType, NotificationTypeStyle> = {
  message: { icon: "mail" },
  success: { icon: "check" },
  security: { icon: "shield" },
  promo: { icon: "star" },
};

export const NOTIFICATION_GROUPS: { key: NotificationGroup; label: string }[] = [
  { key: "today", label: "NOTIFICATIONS_TODAY_LABEL" },
  { key: "earlier", label: "NOTIFICATIONS_EARLIER_LABEL" },
];

// Dummy data for demonstrating the notifications screen in the template
export const DUMMY_NOTIFICATIONS: AppNotification[] = [
  { id: 1, type: "message", group: "today", title: "NOTIFICATION_NEW_MESSAGE", body: "NOTIFICATION_NEW_MESSAGE_BODY", time: "TIME_5_MINUTES_AGO", isRead: false },
  { id: 2, type: "success", group: "today", title: "NOTIFICATION_PAYMENT_RECEIVED", body: "NOTIFICATION_PAYMENT_RECEIVED_BODY", time: "TIME_1_HOUR_AGO", isRead: false },
  { id: 3, type: "security", group: "today", title: "NOTIFICATION_NEW_SIGN_IN", body: "NOTIFICATION_NEW_SIGN_IN_BODY", time: "TIME_3_HOURS_AGO", isRead: true },
  { id: 4, type: "promo", group: "earlier", title: "NOTIFICATION_WEEKEND_OFFER", body: "NOTIFICATION_WEEKEND_OFFER_BODY", time: "TIME_YESTERDAY", isRead: true },
  { id: 5, type: "message", group: "earlier", title: "NOTIFICATION_TEAM_INVITE", body: "NOTIFICATION_TEAM_INVITE_BODY", time: "TIME_2_DAYS_AGO", isRead: true },
  { id: 6, type: "success", group: "earlier", title: "NOTIFICATION_PROFILE_UPDATED", body: "NOTIFICATION_PROFILE_UPDATED_BODY", time: "TIME_3_DAYS_AGO", isRead: true },
];
