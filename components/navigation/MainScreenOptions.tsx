import NavigationHeader from "./Header";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, CustomScreenOptions } from "./types"; // Import the custom type

type MainScreenOptionsProps = {
  route: RouteProp<RootStackParamList, keyof RootStackParamList>;
};

export default function MainScreenOptions({ route }: MainScreenOptionsProps) {
  // Default options if no params are passed
  const defaultOptions: CustomScreenOptions = {
    tabBarShowLabel: false,
    tabBarStyle: {
      // height: METRICS.bottomTabsHeight,
    },
    animation: "slide_from_right",
    animationDuration: 300,
  };

  // If no params are passed, return default options
  if (!route.params) {
    return defaultOptions;
  }

  // Extract params
  const {
    title,
    hasLogo,
    isBackArrowHidden,
    isRightComponentHidden,
    isSmallTitleFont,
    orangeBackground,
    orangeTitle,
    boldTitle,
    onPress,
  } = route.params as CustomScreenOptions; 

  console.log("route.params", route.params);
  

  const DisplayedHeader = (
    <NavigationHeader
      title={title}
      hasBackArrow={!isBackArrowHidden}
      isRightComponentHidden={isRightComponentHidden}
      hasLogo={hasLogo}
      orangeBackground={orangeBackground}
      isSmallTitleFont={isSmallTitleFont}
      orangeTitle={orangeTitle}
      boldTitle={boldTitle}
      onPress={onPress}
    />
  );

  // Return custom options
  return {
    ...defaultOptions,
    header: () => DisplayedHeader,
  };
}