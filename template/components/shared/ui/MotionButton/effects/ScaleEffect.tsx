import Animated from "react-native-reanimated";

import { usePressScaleStyle } from "../hooks";
import { EffectProps } from "../types";

/** The simplest feedback: a slight spring shrink while pressed. */
export default function ScaleEffect({
  children,
  pressed,
  touchHandlers,
  style,
}: EffectProps) {
  const scaleStyle = usePressScaleStyle(pressed);

  return (
    <Animated.View style={[style, scaleStyle]} {...touchHandlers}>
      {children}
    </Animated.View>
  );
}
