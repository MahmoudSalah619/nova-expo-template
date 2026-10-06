import React, { Fragment, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Icon, Text } from "@/components/shared/ui";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import {
  CATEGORY_ICON_COLORS,
  DUMMY_FAVOURITES,
  FAVOURITE_FILTERS,
  FavouriteFilter,
  FavouriteItem,
} from "./constants";
import styles from "./styles";

const CATEGORY_TILE_STYLES = {
  places: styles.tilePlaces,
  products: styles.tileProducts,
  articles: styles.tileArticles,
};

const Favourites = () => {
  const [items, setItems] = useState<FavouriteItem[]>(DUMMY_FAVOURITES);
  const [filter, setFilter] = useState<FavouriteFilter>("all");

  const visibleItems =
    filter === "all" ? items : items.filter((item) => item.category === filter);

  const removeFavourite = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <ScreenWrapper variant="main" isScrollable style={styles.screen}>
      <View style={styles.header}>
        <Text variant="H1">FAVORITES</Text>
        <Text variant="md" color="body">
          FAVORITES_SUBTITLE
        </Text>
      </View>

      <View style={styles.segmented}>
        {FAVOURITE_FILTERS.map((item) => {
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
                numberOfLines={1}
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
            FAVORITES_EMPTY_TITLE
          </Text>
          <Text variant="sm" color="caption" isCentered>
            FAVORITES_EMPTY_BODY
          </Text>
          <Button
            title="FAVORITES_RESTORE"
            variant="outlined"
            size="md"
            containerStyle={styles.restoreButton}
            onPress={() => setItems(DUMMY_FAVOURITES)}
          />
        </View>
      ) : (
        <View style={styles.listCard}>
          {visibleItems.map((item, index) => (
            <Fragment key={item.id}>
              {index > 0 && <View style={styles.rowDivider} />}
              <View style={styles.row}>
                <View style={[styles.rowIcon, CATEGORY_TILE_STYLES[item.category]]}>
                  <Icon
                    name={item.icon}
                    size={20}
                    color={CATEGORY_ICON_COLORS[item.category]}
                  />
                </View>
                <View style={styles.rowText}>
                  <Text size={15} fontFamily="font600" numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text variant="xsm" color="caption" numberOfLines={1}>
                    {item.caption}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.heartButton}
                  hitSlop={8}
                  onPress={() => removeFavourite(item.id)}
                >
                  <Icon name="heartFilled" size={16} color="danger" />
                </TouchableOpacity>
              </View>
            </Fragment>
          ))}
        </View>
      )}
    </ScreenWrapper>
  );
};

export default Favourites;
