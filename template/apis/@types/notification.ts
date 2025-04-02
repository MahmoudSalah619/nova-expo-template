export enum NotificationType {
  NEW_ORDER = "b2b-create-order",
}

export interface NotificationData {
  template_slug?: NotificationType;
  target_object_id?: string | null;
}
