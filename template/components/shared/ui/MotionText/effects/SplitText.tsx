import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import Text from "@/components/shared/ui/Text/Base";
import {
  MOTION_DEFAULTS,
  MOTION_PRESETS,
  MotionPreset,
} from "@/components/shared/ui/MotionView/presets";
import { MOTION_TEXT_DEFAULTS } from "../constants";
import { TextStyleProps } from "../types";
import { hasJoiningScript, splitWords } from "../utils";

interface SplitTextProps {
  text: string;
  textProps: TextStyleProps;
  by: "words" | "letters";
  preset?: MotionPreset;
  duration?: number;
  delay?: number;
  step?: number;
}

/**
 * Each word (or letter) enters one after another with a MotionView preset.
 * Lines still wrap between words. Arabic text always animates by word, since
 * splitting it into letters would break the joined letter forms.
 */
export default function SplitText({
  text,
  textProps,
  by,
  preset = "fadeUp",
  duration = MOTION_DEFAULTS.duration,
  delay = 0,
  step = MOTION_TEXT_DEFAULTS[by].step,
}: SplitTextProps) {
  const mode = by === "letters" && hasJoiningScript(text) ? "words" : by;
  const words = useMemo(() => splitWords(text, mode), [text, mode]);
  const { entering } = MOTION_PRESETS[preset];

  return (
    <View
      accessible
      accessibilityLabel={text}
      style={[styles.line, textProps.isCentered && styles.centered]}
    >
      {words.map((word, wordIndex) => (
        <View key={wordIndex} style={styles.word}>
          {word.pieces.map((piece, pieceIndex) => (
            <Animated.View
              key={pieceIndex}
              entering={entering(
                duration,
                delay + (word.firstIndex + pieceIndex) * step,
              )}
            >
              <Text {...textProps} autoTranslate={false}>
                {piece}
              </Text>
            </Animated.View>
          ))}
          {wordIndex < words.length - 1 && (
            <Text {...textProps} autoTranslate={false}>
              {" "}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  centered: {
    justifyContent: "center",
  },
  word: {
    flexDirection: "row",
  },
});
