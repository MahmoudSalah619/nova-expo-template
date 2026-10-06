import { Tabs } from "expo-router";
import React from "react";
import TabBar from "@/components/shared/layout/AppTabBar";
import "@/components/shared/wrappers/bottomsheets";
/**
 * _layout component sets up the tab navigation layout.
 * It uses the Tabs component from expo-router to define the tab navigation structure.
 */
export default function _layout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />} // Use the custom TabBar component
      backBehavior="history"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          title: "Explore",
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favorites",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
