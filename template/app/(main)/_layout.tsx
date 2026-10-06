import MainScreenOptions from "@/components/shared/layout/MainScreenOptions";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack screenOptions={MainScreenOptions}>
      <Stack.Screen
        name="screen1/index"
        initialParams={{ title: "appearance" }}
      />
      <Stack.Screen
        name="screen2/index"
        initialParams={{
          title: "Screen 2",
        }}
      />
      <Stack.Screen
        name="screen3/index"
        initialParams={{
          title: "flashListTitle",
        }}
      />
      <Stack.Screen
        name="notifications/index"
        initialParams={{
          title: "notificationsTitle",
          isRightComponentHidden: true,
        }}
      />
      <Stack.Screen name="(tabs)" initialParams={{ hasLogo: true }} />
    </Stack>
  );
}
