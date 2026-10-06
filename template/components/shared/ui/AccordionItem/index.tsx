import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styles from "./styles";
import { AccordionItemProps } from "./types";

export default function AccordionItem({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 300,
}: AccordionItemProps) {
  const height = useSharedValue(0);
  const derivedHeight = useDerivedValue(() => {
    const targetHeight = height.value * (isExpanded.value ? 1 : 0);
    return withTiming(targetHeight, {
      duration,
      easing: Easing.inOut(Easing.quad),
    });
  });

  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value || 0,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}
    >
      <View
        onLayout={(e) => {
          const layoutHeight = e.nativeEvent.layout.height;
          if (layoutHeight > 0) {
            height.value = layoutHeight;
          }
        }}
        style={styles.wrapper}
      >
        {children}
      </View>
    </Animated.View>
  );
}
