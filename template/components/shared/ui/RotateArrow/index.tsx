import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect, useCallback } from "react";
import Icon from "../Icon";
import { moderateScale } from "@/constants/Metrics";
import { RotateArrowProps } from "./types";

export default function RotateArrow({
  isOpen,
  iconName = "arrowDown",
  color = "primary",
  size = moderateScale(12),
}: RotateArrowProps) {
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
      <Icon name={iconName} size={size} color={color} />
    </Animated.View>
  );
}
