import { SeperateLine, Text } from "@/components/atoms";
import CardWrapper from "@/components/wrappers/Card";
import FlashListWrapper from "@/components/wrappers/flashlist";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { cardListData } from "@/constants/ListData";
import React from "react";
import { View } from "react-native";

export default function Screen3() {
  return (
    <View style={{ padding: 16, flex: 1 }}>
      <FlashListWrapper
        data={cardListData}
        ListHeaderComponent={() => (
          <View style={{ gap: 8, marginBottom: 16 }}>
            <Text size={16} weight={600} isCentered>
              FlashList Example (50 items)
            </Text>
            <SeperateLine />
          </View>
        )}
        estimatedItemSize={150}
        gap={8}
        renderItem={({ item }) => (
          <CardWrapper>
            <View style={GLOBAL_STYLES.gap8}>
              <Text size={20} weight={700} isCentered>
                {item.title}
              </Text>
              <SeperateLine />
              <Text color="greyCe">{item.description}</Text>
              <Text size={12} color="greyE5">
                {item.date}
              </Text>
            </View>
          </CardWrapper>
        )}
      />
    </View>
  );
}
