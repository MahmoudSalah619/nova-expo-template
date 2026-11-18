import { useEffect, useMemo, useState } from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { useReducedMotion } from "react-native-reanimated";

import Text from "@/components/shared/ui/Text/Base";
import { MOTION_TEXT_DEFAULTS } from "../constants";
import { TextStyleProps } from "../types";

const DEFAULTS = MOTION_TEXT_DEFAULTS.typing;

/** Toggles every `intervalMs` while enabled. */
function useBlink(isEnabled: boolean, intervalMs: number) {
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    if (!isEnabled) return;
    const timer = setInterval(() => setIsOn((on) => !on), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs, isEnabled]);

  return isOn;
}

interface TypingTextProps {
  text: string;
  textProps: TextStyleProps;
  speed?: number;
  delay?: number;
  hasCursor?: boolean;
}

/** Types the text one character at a time, with a blinking cursor. */
export default function TypingText({
  text,
  textProps,
  speed = DEFAULTS.speed,
  delay = 0,
  hasCursor = true,
}: TypingTextProps) {
  // Array.from splits by character, so emoji and accents stay intact.
  const characters = useMemo(() => Array.from(text), [text]);
  const isReducedMotion = useReducedMotion();
  const [typedCount, setTypedCount] = useState(
    isReducedMotion ? characters.length : 0,
  );
  const isCursorOn = useBlink(hasCursor, DEFAULTS.cursorBlinkMs);

  useEffect(() => {
    if (isReducedMotion) {
      setTypedCount(characters.length);
      return;
    }
    setTypedCount(0);
    let timer: ReturnType<typeof setTimeout>;
    const typeUpTo = (count: number) => {
      setTypedCount(count);
      if (count < characters.length) {
        timer = setTimeout(() => typeUpTo(count + 1), speed);
      }
    };
    timer = setTimeout(() => typeUpTo(1), delay);
    return () => clearTimeout(timer);
  }, [characters, delay, isReducedMotion, speed]);

  return (
    <Text {...textProps} autoTranslate={false} accessibilityLabel={text}>
      {characters.slice(0, typedCount).join("")}
      {hasCursor && (
        <RNText style={!isCursorOn && styles.cursorHidden}>|</RNText>
      )}
    </Text>
  );
}

const styles = StyleSheet.create({
  // Nested text can't use opacity; a transparent color keeps the width stable.
  cursorHidden: {
    color: "transparent",
  },
});
