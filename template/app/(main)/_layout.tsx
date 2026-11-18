import MainScreenOptions, {
  createScreenOptions,
} from "@/components/shared/layout/MainScreenOptions";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack screenOptions={MainScreenOptions}>
      <Stack.Screen
        name="screen1/index"
        options={createScreenOptions({ title: "APPEARANCE" })}
      />
      <Stack.Screen
        name="screen2/index"
        options={createScreenOptions({ title: "ROUTE_PARAMS" })}
      />
      <Stack.Screen
        name="screen3/index"
        options={createScreenOptions({ title: "FLASH_LIST" })}
      />
      <Stack.Screen
        name="motion/index"
        options={createScreenOptions({ title: "MOTION" })}
      />
      <Stack.Screen
        name="motion-text/index"
        options={createScreenOptions({ title: "TEXT_EFFECTS" })}
      />
      <Stack.Screen
        name="motion-button/index"
        options={createScreenOptions({ title: "BUTTON_EFFECTS" })}
      />
      <Stack.Screen
        name="skeleton/index"
        options={createScreenOptions({ title: "SKELETON" })}
      />
      <Stack.Screen
        name="notifications/index"
        options={createScreenOptions({
          title: "NOTIFICATIONS",
          isRightComponentHidden: true,
        })}
      />
      <Stack.Screen
        name="(tabs)"
        options={createScreenOptions({ hasLogo: true })}
      />
    </Stack>
  );
}
