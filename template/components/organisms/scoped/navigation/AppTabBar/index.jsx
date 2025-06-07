import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Text, ThemedView } from "@/components/atoms";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "@/constants/Colors";

// Icon mapping for routes
const getIcon = (routeName, isFocused) => {
  const icons = {
    Home: "home",
    Favourites: "favorite",
    Explore: "explore",
    Profile: "person",
  };
  const iconName = icons[routeName];
  return iconName ? (
    <MaterialIcons
      name={iconName}
      size={26}
      color={isFocused ? COLORS.light.primary : "black"}
    />
  ) : null;
};

// TabBar component
const TabBar = ({ state, descriptors, navigation }) => {
  const handlePress = (route, isFocused) => {
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
    <ThemedView style={styles.tabbarContainer}>
      <View style={styles.tabbar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handlePress(route, isFocused)}
              style={styles.tab}
            >
              {getIcon(route.name, isFocused)}
              <Text color={isFocused ? "primary" : "text"}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  tabbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  tabbar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    // backgroundColor: "#fff",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
