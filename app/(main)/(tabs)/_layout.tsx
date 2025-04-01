import { Tabs } from "expo-router";
import React from "react";
import TabBar from "@/components/organisms/scoped/navigation/AppTabBar";
import "@/components/organisms/common/bottomsheets";
/**
 * _layout component sets up the tab navigation layout.
 * It uses the Tabs component from expo-router to define the tab navigation structure.
 */
export default function _layout() {
  return (
    <Tabs
      initialRouteName="home" // Set the initial route to the home screen
      tabBar={(props) => <TabBar {...props} />} // Use the custom TabBar component
      backBehavior="history"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="explore"
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
