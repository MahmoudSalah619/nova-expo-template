import { View } from "react-native";
import { iconsColorType } from "@/@types/mainTypes";
import { Icon, PressableScale, Text } from "@/components/shared/ui";
import { NOTIFICATION_TYPE_ICONS } from "../constants";
import { NotificationType } from "../types";
import { NotificationItemProps } from "./types";
import styles from "./styles";

const ICON_COLORS: Record<NotificationType, iconsColorType> = {
  message: "action",
  success: "success",
  security: "danger",
  promo: "secondary",
};

const ICON_BACKGROUNDS = {
  message: styles.iconMessage,
  success: styles.iconSuccess,
  security: styles.iconSecurity,
  promo: styles.iconPromo,
};

/**
 * One notification row. Unread rows get a tinted background and a dot.
 * @example
 * <NotificationItem notification={item} onPress={markAsRead} />
 */
export default function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const { id, type, title, body, time, isRead } = notification;

  return (
    <PressableScale
      style={[styles.container, !isRead && styles.unread]}
      pressedScale={0.98}
      hasHaptics={false}
      onPress={() => onPress(id)}
    >
      <View
        style={[
          styles.iconChip,
          ICON_BACKGROUNDS[type],
          !isRead && styles.iconOnUnread,
        ]}
      >
        <Icon
          name={NOTIFICATION_TYPE_ICONS[type].icon}
          size={type === "success" ? 26 : 20}
          color={ICON_COLORS[type]}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            size={15}
            fontFamily={isRead ? "font500" : "font700"}
            numberOfLines={1}
            style={styles.title}
          >
            {title}
          </Text>
          {!isRead && <View style={styles.unreadDot} />}
        </View>
        <Text variant="sm" color="body" numberOfLines={2}>
          {body}
        </Text>
        <Text variant="xsm" color="caption" style={styles.time}>
          {time}
        </Text>
      </View>
    </PressableScale>
  );
}
