import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Icon from "@/assets/icons";

const { height } = Dimensions.get("window");

// Helper function to calculate height percentage
const hp = (percentage) => (height * percentage) / 100;

// Icon mapping for routes
const getIcon = (routeName, isFocused) => {
  const icons = {
    home: "home",
    favourites: "heart",
    explore: "camera",
    profile: "profile",
  };
  const iconName = icons[routeName];
  return iconName ? (
    <Icon name={iconName} size={hp(2.5)} color={isFocused ? "#673ab7" : "black"} />
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
    <View style={styles.tabbarContainer}>
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
              <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
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
    backgroundColor: "#fff",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
