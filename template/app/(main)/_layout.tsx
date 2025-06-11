import MainScreenOptions from "@/components/organisms/scoped/navigation/MainScreenOptions";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack screenOptions={MainScreenOptions}>
      <Stack.Screen
        name="screen1/index"
        initialParams={{ title: "Screen 1 Header" }}
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
          title: "Screen 3",
        }}
      />
      <Stack.Screen name="(tabs)" initialParams={{ hasLogo: true }} />
    </Stack>
  );
}
