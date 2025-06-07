import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { COLORS } from "@/constants/Colors";
import { NoResults } from "../../molecules/common";

interface FlashListWrapperProps<T>
  extends Omit<FlashListProps<T>, "data" | "renderItem"> {
  data: T[] | undefined;
  isLoading?: boolean;
  isRefreshing?: boolean;
  estimatedItemSize?: number;
  gap?: number;
  renderItem: ({ item }: { item: T }) => JSX.Element;
  onEndReached?: () => void;
  onRefresh?: () => void;
  ListFooterComponent?: JSX.Element;
}

export default function FlashListWrapper<T extends { id: number }>({
  data,
  isLoading,
  isRefreshing,
  estimatedItemSize,
  gap,
  renderItem,
  onEndReached,
  onRefresh,
  ListFooterComponent,
  ...flashListProps
}: FlashListWrapperProps<T>) {
  const renderFooter = () => {
    if (isLoading && data && data.length > 0) {
      return <ActivityIndicator size="small" style={styles.footer} />;
    }
    return ListFooterComponent || null;
  };

  if (isLoading && (!data || data.length === 0)) {
    return (
      <View style={[GLOBAL_STYLES.rowCenter, GLOBAL_STYLES.fullSize]}>
        <ActivityIndicator size="small" color={COLORS.light.primary} />
      </View>
    );
  }

  if (!isLoading && (!data || data.length === 0)) {
    return <NoResults />;
  }

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ height: gap || 0 }} />}
      keyExtractor={(item: Record<string, string | number>) => String(item?.id)}
      onEndReached={onEndReached}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={estimatedItemSize || 200} // Adjust this based on your item size
      {...flashListProps}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    marginVertical: 28,
  },
});
