import { SeperateLine, Text } from "@/components/atoms";
import MainScreenWrapper from "@/components/templates/MainScreenWrapper";
import CardWrapper from "@/components/wrappers/Card";
import FlashListWrapper from "@/components/wrappers/flashlist";
import { cardListData } from "@/constants/ListData";
import React from "react";
import { View } from "react-native";

export default function Screen3() {
  return (
    <MainScreenWrapper>
      <Text>FlashList (30 items)</Text>
      <SeperateLine />
      <FlashListWrapper
        data={cardListData}
        estimatedItemSize={150}
        gap={8}
        renderItem={({ item }) => (
          <CardWrapper>
            <View>
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
    </MainScreenWrapper>
  );
}
