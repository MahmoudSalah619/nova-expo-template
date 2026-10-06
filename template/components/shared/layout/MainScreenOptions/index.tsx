import { NativeStackNavigationOptions } from "expo-router";
import { CustomScreenOptions } from "../types"; // Import the custom type
import NavigationHeader from "../AppHeader";

type MainScreenOptionsProps = {
  route: { params?: CustomScreenOptions };
};

export default function MainScreenOptions({
  route,
}: MainScreenOptionsProps): NativeStackNavigationOptions {
  // Default options if no params are passed
  const defaultOptions: NativeStackNavigationOptions = {
    animation: "slide_from_right",
    animationDuration: 300,
  };

  // If no params are passed, return default options
  if (!route.params) {
    return defaultOptions;
  }

  // Extract params
  const { title, hasLogo, isBackArrowHidden, isRightComponentHidden, onPress } =
    route.params;

  const DisplayedHeader = (
    <NavigationHeader
      title={title}
      hasBackArrow={!isBackArrowHidden}
      isRightComponentHidden={isRightComponentHidden}
      hasLogo={hasLogo}
      onPress={onPress}
    />
  );

  // Return custom options
  return {
    ...defaultOptions,
    header: () => DisplayedHeader,
  };
}
