import { LayoutChangeEvent, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Spacing from "@/constants/Spacing";
import { iconsListType } from "@/@types/mainTypes";
import { Tabs } from "expo-router";
import TabItem from "./TabItem";
import styles, { TAB_BAR_PADDING, TAB_GAP } from "./styles";

// Props that expo-router's <Tabs tabBar={...} /> passes to a custom tab bar.
type BottomTabBarProps = Parameters<
  NonNullable<React.ComponentProps<typeof Tabs>["tabBar"]>
>[0];

// Icon mapping for routes (route names are matched case-insensitively)
const TAB_ICONS: Record<string, iconsListType> = {
  home: "home",
  favourites: "heart",
  explore: "compass",
  profile: "user",
};

const INDICATOR_TIMING = { duration: 260, easing: Easing.out(Easing.cubic) };

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Floating tab bar. The active pill slides to the selected tab.
 */
const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const indicatorX = useSharedValue(0);

  const tabCount = state.routes.length;
  const tabWidth =
    barWidth > 0
      ? (barWidth - TAB_BAR_PADDING * 2 - TAB_GAP * (tabCount - 1)) / tabCount
      : 0;

  useEffect(() => {
    if (!tabWidth) return;
    indicatorX.value = withTiming(
      TAB_BAR_PADDING + state.index * (tabWidth + TAB_GAP),
      INDICATOR_TIMING
    );
  }, [state.index, tabWidth, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    setBarWidth(event.nativeEvent.layout.width);
  };

  const handlePress = (
    route: (typeof state.routes)[number],
    isFocused: boolean
  ) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  return (
    <View
      style={[
        styles.tabbarContainer,
        { bottom: Math.max(insets.bottom, Spacing.x3) },
      ]}
    >
      <View style={styles.tabbar} onLayout={handleLayout}>
        {tabWidth > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[styles.indicator, { width: tabWidth }, indicatorStyle]}
          />
        )}
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : typeof options.title === "string"
              ? options.title
              : capitalize(route.name);
          const isFocused = state.index === index;

          return (
            <TabItem
              key={route.key}
              icon={TAB_ICONS[route.name.toLowerCase()] || "home"}
              label={label}
              isFocused={isFocused}
              onPress={() => handlePress(route, isFocused)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
