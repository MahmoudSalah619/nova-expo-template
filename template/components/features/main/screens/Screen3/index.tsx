import { Icon, Text } from "@/components/shared/ui";
import CardWrapper from "@/components/shared/wrappers/Card";
import FlashListWrapper from "@/components/shared/wrappers/FlashList";
import { cardListData } from "@/constants/ListData";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

export default function Screen3() {
  return (
    <View style={styles.container}>
      <FlashListWrapper
        data={cardListData}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <Text variant="H2">flashListTitle</Text>
            <Text variant="md" color="body">
              FlashList Example (50 items)
            </Text>
          </View>
        )}
        estimatedItemSize={150}
        gap={12}
        renderItem={({ item, index }) => (
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
        )}
      />
    </View>
  );
}
