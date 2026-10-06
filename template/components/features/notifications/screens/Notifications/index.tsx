import { Fragment, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import { Icon, Text } from "@/components/shared/ui";
import NotificationItem from "../../NotificationItem";
import { DUMMY_NOTIFICATIONS, NOTIFICATION_GROUPS } from "../../constants";
import { AppNotification } from "../../types";
import styles from "./styles";

type Filter = "all" | "unread";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "notificationsAll" },
  { key: "unread", label: "notificationsUnread" },
];

export default function Notifications() {
  const [notifications, setNotifications] =
    useState<AppNotification[]>(DUMMY_NOTIFICATIONS);
  const [filter, setFilter] = useState<Filter>("all");

  const unreadCount = notifications.filter((item) => !item.isRead).length;
  const visibleNotifications =
    filter === "unread"
      ? notifications.filter((item) => !item.isRead)
      : notifications;

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, isRead: true }))
    );
  };

  return (
    <ScreenWrapper variant="main" isScrollable style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text variant="md" color="body">
            {unreadCount > 0 ? "notificationsSubtitle" : "notificationsAllCaughtUp"}
          </Text>
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
            <Text size={13} fontFamily="font600" color="primary">
              markAllAsRead
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.segmented}>
        {FILTERS.map((item) => {
          const isActive = filter === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.segment, isActive && styles.segmentActive]}
              onPress={() => setFilter(item.key)}
            >
              <Text
                size={13}
                fontFamily={isActive ? "font700" : "font500"}
                color={isActive ? "heading" : "caption"}
              >
                {item.label}
              </Text>
              {item.key === "unread" && unreadCount > 0 && (
                <View style={styles.countBadge}>
                  <Text
                    size={11}
                    fontFamily="font700"
                    color="onAction"
                    autoTranslate={false}
                  >
                    {String(unreadCount)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {visibleNotifications.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Icon name="bell" size={30} color="action" />
          </View>
          <Text variant="H4" isCentered>
            notificationsEmptyTitle
          </Text>
          <Text variant="sm" color="caption" isCentered>
            notificationsEmptyBody
          </Text>
        </View>
      ) : (
        NOTIFICATION_GROUPS.map((group, groupIndex) => {
          const groupItems = visibleNotifications.filter(
            (item) => item.group === group.key
          );
          if (groupItems.length === 0) return null;

          return (
            <View key={group.key} style={styles.section}>
              <Text variant="xsm" color="caption" style={styles.sectionLabel}>
                {group.label}
              </Text>
              <View style={styles.listCard}>
                {groupItems.map((item, index) => (
                  <Fragment key={item.id}>
                    {index > 0 && <View style={styles.divider} />}
                    <NotificationItem notification={item} onPress={markAsRead} />
                  </Fragment>
                ))}
              </View>
            </View>
          );
        })
      )}
    </ScreenWrapper>
  );
}
