import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import COLORS from "@/constants/Colors";
import { ProgressLineProps } from "./types";
import styles from "./styles";

function ProgressLine({
  limit = 100,
  progress = 10,
  progressColor = COLORS.Neutral100,
  fillColor = COLORS.primary,
  customHeight = 8,
}: ProgressLineProps) {
  const controlProgressPercentage = Math.min(progress, limit);
  const animationProgress = useSharedValue(0);
  const progressWidth = (controlProgressPercentage / limit) * 100;

  useEffect(() => {
    animationProgress.value = withTiming(progressWidth, {
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    });
  }, [progressWidth]);

  const animatedStyles = useAnimatedStyle(() => ({
    width: `${animationProgress.value}%`,
  }));

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: progressColor,
        height: customHeight,
      }}
    >
      <Animated.View
        style={[
          styles.progress,
          animatedStyles,
          {
            backgroundColor: fillColor,
            height: customHeight,
          },
        ]}
      />
    </View>
  );
}

export default ProgressLine;
