import { NativeStackNavigationOptions } from "expo-router";
import { CustomScreenOptions } from "../types"; // Import the custom type
import NavigationHeader from "../AppHeader";

type MainScreenOptionsProps = {
  route: { params?: CustomScreenOptions };
};

/**
 * Builds stack options (custom header + transition) from header params.
 * Pass the result to a screen's `options` prop in a layout, e.g.
 * `<Stack.Screen name="x" options={createScreenOptions({ title: "X" })} />`.
 * (SDK 58 removed `Stack.Screen` `initialParams`, which this used to read.)
 */
export function createScreenOptions(
  params?: CustomScreenOptions
): NativeStackNavigationOptions {
  const defaultOptions: NativeStackNavigationOptions = {
    animation: "slide_from_right",
    animationDuration: 300,
  };

  if (!params) {
    return defaultOptions;
  }

  const { title, hasLogo, isBackArrowHidden, isRightComponentHidden, onPress } =
    params;

  const DisplayedHeader = (
    <NavigationHeader
      title={title}
      hasBackArrow={!isBackArrowHidden}
      isRightComponentHidden={isRightComponentHidden}
      hasLogo={hasLogo}
      onPress={onPress}
    />
  );

  return {
    ...defaultOptions,
    header: () => DisplayedHeader,
  };
}

/** Navigator-level `screenOptions`: still honours params passed at navigation time. */
export default function MainScreenOptions({
  route,
}: MainScreenOptionsProps): NativeStackNavigationOptions {
  return createScreenOptions(route.params);
}
