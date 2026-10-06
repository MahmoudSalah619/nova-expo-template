import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import Constants from "expo-constants";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import NovaBlack from "@/assets/images/nova-black.png";
import NovaWhite from "@/assets/images/nova-white.png";
import { Text } from "@/components/shared/ui";
import { theme } from "@/utils/getTheme";
import styles from "./styles";
import { AnimatedSplashProps } from "./types";

const MIN_VISIBLE_MS = 1600;
const PULSE_MS = 1800;
const EXIT_MS = 450;
const DOT_COUNT = 3;
const DOT_STAGGER_MS = 160;
const LOGO_SOURCE = theme === "dark" ? NovaWhite : NovaBlack;

function PulseRing({ delay }: { delay: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: PULSE_MS, easing: Easing.out(Easing.quad) }),
        -1
      )
    );
  }, [delay, progress]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.22 * (1 - progress.value),
    transform: [{ scale: 0.7 + progress.value * 1.1 }],
  }));

  return <Animated.View style={[styles.ring, ringStyle]} />;
}

function LoadingDot({ index }: { index: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      index * DOT_STAGGER_MS,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 380 }),
          withTiming(0, { duration: 380 })
        ),
        -1
      )
    );
  }, [index, progress]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: 0.3 + progress.value * 0.7,
    transform: [{ translateY: -progress.value * 4 }],
  }));

  return <Animated.View style={[styles.dot, dotStyle]} />;
}

/**
 * Full-screen animated splash rendered above the navigator. Its first frame
 * matches the native splash (same background + logo size), so the hand-off
 * is invisible; it then pulses until `isReady` and fades out.
 * @example
 * {isSplashVisible && (
 *   <AnimatedSplash isReady={isLoaded} onFinish={() => setSplashVisible(false)} />
 * )}
 */
export default function AnimatedSplash({ isReady, onFinish }: AnimatedSplashProps) {
  const [hasMinTimeElapsed, setHasMinTimeElapsed] = useState(false);
  const logoScale = useSharedValue(1);
  const wordmarkProgress = useSharedValue(0);
  const exitProgress = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => setHasMinTimeElapsed(true), MIN_VISIBLE_MS);
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: PULSE_MS / 2, easing: Easing.inOut(Easing.sin) }),
        withTiming(1, { duration: PULSE_MS / 2, easing: Easing.inOut(Easing.sin) })
      ),
      -1
    );
    return () => clearTimeout(timer);
  }, [logoScale]);

  // Fonts are ready once isReady flips, so the wordmark only appears then.
  useEffect(() => {
    if (!isReady) return;
    wordmarkProgress.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
  }, [isReady, wordmarkProgress]);

  useEffect(() => {
    if (!isReady || !hasMinTimeElapsed) return;
    exitProgress.value = withTiming(
      1,
      { duration: EXIT_MS, easing: Easing.in(Easing.cubic) },
      (isFinished) => {
        if (isFinished) runOnJS(onFinish)();
      }
    );
  }, [isReady, hasMinTimeElapsed, exitProgress, onFinish]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: 1 - exitProgress.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value + exitProgress.value * 0.25 }],
  }));

  const wordmarkStyle = useAnimatedStyle(() => ({
    opacity: wordmarkProgress.value,
    transform: [{ translateY: (1 - wordmarkProgress.value) * 12 }],
  }));

  return (
    <Animated.View
      style={[styles.container, containerStyle]}
      pointerEvents={isReady && hasMinTimeElapsed ? "none" : "auto"}
    >
      <View style={styles.stage}>
        <PulseRing delay={0} />
        <PulseRing delay={PULSE_MS / 2} />
        <Animated.View style={logoStyle}>
          <Image source={LOGO_SOURCE} style={styles.logo} resizeMode="contain" />
        </Animated.View>
      </View>

      <Animated.View style={[styles.wordmark, wordmarkStyle]}>
        {isReady && (
          <Text variant="H4" autoTranslate={false}>
            {Constants.expoConfig?.name ?? ""}
          </Text>
        )}
        <View style={styles.dots}>
          {Array.from({ length: DOT_COUNT }, (_, index) => (
            <LoadingDot key={index} index={index} />
          ))}
        </View>
      </Animated.View>
    </Animated.View>
  );
}
