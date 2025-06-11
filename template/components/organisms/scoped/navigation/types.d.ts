import { NavigatorScreenParams } from "@react-navigation/native";

export type CustomScreenOptions = NavigatorScreenParams & {
  hasLogo?: boolean;
  isBackArrowHidden?: boolean;
  isRightComponentHidden?: boolean;
  isSmallTitleFont?: boolean;
  orangeBackground?: boolean;
  orangeTitle?: boolean;
  boldTitle?: boolean;
  onPress?: () => void;
};

export type RootStackParamList = {
  "screen1/index": CustomScreenOptions;
  "screen2/index": CustomScreenOptions;
  "(tabs)": { hasLogo: boolean }; // Example for tabs
};
