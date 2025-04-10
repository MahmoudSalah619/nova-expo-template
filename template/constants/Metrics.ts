import { Dimensions, PixelRatio, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const widthScale = WIDTH / 375;
const heightScale = HEIGHT / 812;

export function moderateScale(size: number) {
  const newSize = size * widthScale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

export function horizontalScale(width: number) {
  return widthScale * width;
}

export function verticalScale(height: number) {
  return heightScale * height;
}

const METRICS = {
  screenWidth: WIDTH,
  screenHeight: HEIGHT,
  bottomTabsHeight: Platform.select({ android: 66, ios: 80 }),
  headerHeight: getStatusBarHeight(),
  generalSpacingValue: WIDTH * 0.035,
};

export default METRICS;
