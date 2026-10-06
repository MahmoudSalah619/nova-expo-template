import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, PressableScale, Text } from "@/components/shared/ui";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import {
  DUMMY_FAVOURITES,
  FAVOURITE_FILTERS,
  FavouriteCategory,
  FavouriteItem,
  TONE_ICON_COLORS,
} from "./constants";
import styles from "./styles";

type Filter = FavouriteCategory | "all";

const TONE_STYLES = {
  action: styles.tileAction,
  success: styles.tileSuccess,
  danger: styles.tileDanger,
  neutral: styles.tileNeutral,
};

const Favourites = () => {
  const [items, setItems] = useState<FavouriteItem[]>(DUMMY_FAVOURITES);
  const [filter, setFilter] = useState<Filter>("all");

  const visibleItems = items.filter(
    (item) => item.isFavourite && (filter === "all" || item.category === filter)
  );

  const toggleFavourite = (id: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, isFavourite: !item.isFavourite } : item
      )
    );
  };

  return (
    <ScreenWrapper variant="main" isScrollable style={styles.screen}>
      <View style={styles.header}>
        <Text variant="H1">favouritesTitle</Text>
        <Text variant="md" color="body">
          favouritesSubtitle
        </Text>
      </View>

      <View style={styles.chipsRow}>
        {FAVOURITE_FILTERS.map((item) => {
          const isActive = filter === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => setFilter(item.key)}
            >
              <Text
                size={13}
                fontFamily="font600"
                color={isActive ? "onAction" : "body"}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {visibleItems.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Icon name="heart" size={30} color="danger" />
          </View>
          <Text variant="H4" isCentered>
            favEmptyTitle
          </Text>
          <Text variant="sm" color="caption" isCentered>
            favEmptyBody
          </Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {visibleItems.map((item) => (
            <View key={item.id} style={styles.cardWrapper}>
              <PressableScale style={styles.card} onPress={() => {}}>
                <View style={styles.cardTop}>
                  <View style={[styles.iconTile, TONE_STYLES[item.tone]]}>
                    <Icon name={item.icon} size={22} color={TONE_ICON_COLORS[item.tone]} />
                  </View>
                  <TouchableOpacity
                    style={[styles.heartButton, styles.heartButtonActive]}
                    hitSlop={8}
                    onPress={() => toggleFavourite(item.id)}
                  >
                    <Icon name="heart" size={16} color="danger" />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardText}>
                  <Text size={15} fontFamily="font600" numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text variant="xsm" color="caption" numberOfLines={2}>
                    {item.subtitle}
                  </Text>
                </View>
                <View style={styles.cardFooter}>
                  <Text variant="xsm" color="primary" fontFamily="font600">
                    {FAVOURITE_FILTERS.find((f) => f.key === item.category)?.label ?? ""}
                  </Text>
                </View>
              </PressableScale>
            </View>
          ))}
        </View>
      )}
    </ScreenWrapper>
  );
};

export default Favourites;
