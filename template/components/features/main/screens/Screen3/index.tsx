import { Icon, Text } from "@/components/shared/ui";
import CardWrapper from "@/components/shared/wrappers/Card";
import FlashListWrapper from "@/components/shared/wrappers/FlashList";
import { cardListData } from "@/constants/ListData";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function Screen3() {
  const [favouriteIds, setFavouriteIds] = useState<number[]>([]);

  const toggleFavourite = (id: number) => {
    setFavouriteIds((current) =>
      current.includes(id)
        ? current.filter((favouriteId) => favouriteId !== id)
        : [...current, id]
    );
  };

  return (
    <View style={styles.container}>
      <FlashListWrapper
        data={cardListData}
        extraData={favouriteIds}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <Text variant="H2">FLASH_LIST</Text>
            <Text variant="md" color="body">
              FLASH_LIST_SUBTITLE
            </Text>
          </View>
        )}
        estimatedItemSize={150}
        gap={12}
        renderItem={({ item }) => {
          const isFavourite = favouriteIds.includes(item.id);
          return (
          <View>
          <CardWrapper customStyles={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.indexChip}>
                <Text
                  size={13}
                  fontFamily="font700"
                  color="primary"
                  autoTranslate={false}
                >
                  {String(item.id)}
                </Text>
              </View>
              <Text
                size={16}
                fontFamily="font600"
                style={styles.cardTitle}
                autoTranslate={false}
              >
                {item.title}
              </Text>
              <TouchableOpacity
                style={[styles.heartButton, isFavourite && styles.heartButtonActive]}
                hitSlop={8}
                onPress={() => toggleFavourite(item.id)}
              >
                <Icon
                  name={isFavourite ? "heartFilled" : "heart"}
                  size={16}
                  color={isFavourite ? "danger" : "secondary"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.cardBody}>
              <Text variant="sm" color="body" autoTranslate={false}>
                {item.description}
              </Text>
              <View style={styles.dateRow}>
                <Icon name="calendar" size={14} color="caption" />
                <Text variant="xsm" color="caption" autoTranslate={false}>
                  {item.date}
                </Text>
              </View>
            </View>
          </CardWrapper>
          </View>
          );
        }}
      />
    </View>
  );
}
