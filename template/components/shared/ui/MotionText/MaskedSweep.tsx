import MaskedViewBase from "@react-native-masked-view/masked-view";
import {
  ComponentType,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from "react-native";
import {
  cancelAnimation,
  Easing,
  SharedValue,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import Text from "@/components/shared/ui/Text/Base";
import { TextStyleProps } from "./types";

// The library ships pre-React-19 class typings (no `props` field), which
// TypeScript rejects as JSX. Same component, correct type.
const MaskedView = MaskedViewBase as unknown as ComponentType<
  ViewProps & { maskElement: ReactElement }
>;

interface MaskedSweepProps {
  text: string;
  textProps: TextStyleProps;
  /** One loop of `progress` (0 → 1), in ms. */
  duration: number;
  /** Paints what shows through the letters. Must be a component (it uses hooks). */
  renderLayer: (width: number, progress: SharedValue<number>) => ReactNode;
  /** Rendered behind the letters (e.g. a glow). */
  underlay?: ReactNode;
}

/**
 * Shows `renderLayer` only through the shape of the text (a stencil), and
 * drives a looping `progress` value the layer can animate with. React Native
 * text has a single solid color, so this is how gradient/shimmer text works.
 * Holds still when the device asks for reduced motion.
 */
export default function MaskedSweep({
  text,
  textProps,
  duration,
  renderLayer,
  underlay,
}: MaskedSweepProps) {
  const [width, setWidth] = useState(0);
  const progress = useSharedValue(0);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isReducedMotion || width === 0) return;
    progress.set(
      withRepeat(withTiming(1, { duration, easing: Easing.linear }), -1, false),
    );
    return () => cancelAnimation(progress);
  }, [duration, isReducedMotion, progress, width]);

  const handleLayout = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);

  const maskText = (
    <Text {...textProps} autoTranslate={false}>
      {text}
    </Text>
  );

  return (
    <View>
      {underlay}
      <MaskedView onLayout={handleLayout} maskElement={maskText}>
        {/* Invisible copy sizes the view (and is what screen readers read). */}
        <Text
          {...textProps}
          autoTranslate={false}
          style={[textProps.style, styles.hidden]}
        >
          {text}
        </Text>
        {width > 0 && (
          <View style={[StyleSheet.absoluteFill, styles.layer]}>
            {renderLayer(width, progress)}
          </View>
        )}
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    opacity: 0,
  },
  // Layers position themselves from the left edge. Without this, Arabic (RTL)
  // layout anchors them on the right and the sweep leaves blank gaps.
  // Layers flip their sweep direction for RTL themselves.
  layer: {
    direction: "ltr",
  },
});
