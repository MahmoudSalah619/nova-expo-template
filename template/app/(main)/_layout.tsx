import MainScreenOptions from "@/components/shared/layout/MainScreenOptions";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack screenOptions={MainScreenOptions}>
      <Stack.Screen
        name="screen1/index"
        initialParams={{ title: "APPEARANCE" }}
      />
      <Stack.Screen
        name="screen2/index"
        initialParams={{
          title: "ROUTE_PARAMS",
        }}
      />
      <Stack.Screen
        name="screen3/index"
        initialParams={{
          title: "FLASH_LIST",
        }}
      />
      <Stack.Screen
        name="notifications/index"
        initialParams={{
          title: "NOTIFICATIONS",
          isRightComponentHidden: true,
        }}
      />
      <Stack.Screen name="(tabs)" initialParams={{ hasLogo: true }} />
    </Stack>
  );
}
