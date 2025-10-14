import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect, useCallback } from "react";
import ICONS from "@/components/atoms/icons";

export default function RotateArrow({ isOpen }: { isOpen: boolean }) {
  const iconPosition = useSharedValue("0deg");

  const rotateArrow = useCallback(() => {
    iconPosition.value = withSpring(isOpen ? "180deg" : "0deg");
  }, [iconPosition, isOpen]);

  useEffect(() => {
    rotateArrow();
  }, [rotateArrow]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: iconPosition.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ICONS.ArrowDown />
    </Animated.View>
  );
}
