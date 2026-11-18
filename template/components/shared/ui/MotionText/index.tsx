import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import CountText from "./effects/CountText";
import GradientText from "./effects/GradientText";
import ShimmerText from "./effects/ShimmerText";
import SplitText from "./effects/SplitText";
import TypingText from "./effects/TypingText";
import { MotionTextEffect, MotionTextProps, MotionTextPropsFor } from "./types";

type Translate = (value: string, autoTranslate?: boolean) => string;

/** Renders one effect from its own props (effect-only options are pulled out). */
type EffectRenderer<E extends MotionTextEffect> = (
  props: MotionTextPropsFor<E>,
  translate: Translate,
) => ReactElement;

const renderSplit = (
  {
    effect,
    children,
    autoTranslate,
    preset,
    duration,
    delay,
    step,
    ...textProps
  }: MotionTextPropsFor<"words" | "letters">,
  translate: Translate,
) => (
  <SplitText
    text={translate(children, autoTranslate)}
    textProps={textProps}
    by={effect}
    preset={preset}
    duration={duration}
    delay={delay}
    step={step}
  />
);

/**
 * Effect name → renderer. TypeScript requires an entry for every effect, so
 * adding a new effect type without a renderer fails to compile.
 */
const EFFECT_RENDERERS: { [E in MotionTextEffect]: EffectRenderer<E> } = {
  gradient: (
    {
      effect,
      children,
      autoTranslate,
      colors,
      duration,
      hasGlow,
      ...textProps
    },
    translate,
  ) => (
    <GradientText
      text={translate(children, autoTranslate)}
      textProps={textProps}
      colors={colors}
      duration={duration}
      hasGlow={hasGlow}
    />
  ),
  shimmer: (
    { effect, children, autoTranslate, duration, ...textProps },
    translate,
  ) => (
    <ShimmerText
      text={translate(children, autoTranslate)}
      textProps={textProps}
      duration={duration}
    />
  ),
  typing: (
    { effect, children, autoTranslate, speed, delay, hasCursor, ...textProps },
    translate,
  ) => (
    <TypingText
      text={translate(children, autoTranslate)}
      textProps={textProps}
      speed={speed}
      delay={delay}
      hasCursor={hasCursor}
    />
  ),
  words: renderSplit,
  letters: renderSplit,
  count: ({
    effect,
    autoTranslate,
    to,
    from,
    duration,
    delay,
    format,
    ...textProps
  }) => (
    <CountText
      textProps={textProps}
      to={to}
      from={from}
      duration={duration}
      delay={delay}
      format={format}
    />
  ),
};

/** Looks up the renderer for `props.effect`, keeping its props type exact. */
function renderEffect<E extends MotionTextEffect>(
  props: MotionTextPropsFor<E>,
  translate: Translate,
) {
  const render: EffectRenderer<E> = EFFECT_RENDERERS[props.effect as E];
  return render(props, translate);
}

/**
 * Animated text. Same typography props as `Text` (variant, color, size...),
 * plus an `effect`. Text is translated first (like `Text`), then animated.
 * Every effect shows the final text still when the device asks for reduced motion.
 *
 * @example
 * <MotionText effect="gradient" hasGlow variant="H1">WELCOME_TITLE</MotionText>
 * <MotionText effect="shimmer">Loading your data</MotionText>
 * <MotionText effect="typing">Hello, John</MotionText>
 * <MotionText effect="words" preset="fadeUp">Build apps that feel great</MotionText>
 * <MotionText effect="count" to={1250} />
 */
export default function MotionText(props: MotionTextProps) {
  const { t } = useTranslation();
  const translate: Translate = (value, autoTranslate = true) =>
    autoTranslate ? t(value) : value;

  return renderEffect(props, translate);
}
