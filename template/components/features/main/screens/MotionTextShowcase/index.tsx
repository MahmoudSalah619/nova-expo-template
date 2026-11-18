import { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import { Button, MotionText, Text } from "@/components/shared/ui";
import ReplaySection from "../../components/ReplaySection";
import ShowcaseItem from "../../components/ShowcaseItem";
import styles from "./styles";

const CUSTOM_GRADIENT = ["#22C55E", "#06B6D4", "#3B82F6"] as const;
const formatPrice = (value: number) => `$${value.toFixed(2)}`;

/**
 * One live example per MotionText effect, in the app's language. Each section
 * has its own Replay button; the one at the top replays every section.
 * Section titles and examples are i18n keys; descriptions and labels are
 * translated here because ShowcaseSection/ShowcaseItem render them as-is.
 * Code labels (hasGlow, preset="pop"...) stay in English on purpose.
 */
export default function MotionTextShowcase() {
  const { t } = useTranslation();
  const [replayKey, setReplayKey] = useState(0);
  const replay = () => setReplayKey((key) => key + 1);

  return (
    <ScreenWrapper variant="main" isScrollable>
      <View style={styles.header}>
        <Text variant="H2">TEXT_EFFECTS</Text>
        <Text variant="md" color="body">
          TEXT_EFFECTS_SUBTITLE
        </Text>
        <Button title="MOTION_REPLAY" onPress={replay} />
      </View>

      <View style={styles.sections}>
        <ReplaySection
          replayAllKey={replayKey}
          title="TEXT_EFFECTS_GRADIENT"
          description={t("TEXT_EFFECTS_GRADIENT_DESC")}
        >
          <ShowcaseItem label={t("TEXT_EFFECTS_DEFAULT")}>
            <MotionText effect="gradient" variant="H1">
              WELCOME_TITLE
            </MotionText>
          </ShowcaseItem>
          <ShowcaseItem label="hasGlow">
            <MotionText effect="gradient" hasGlow variant="H1">
              TEXT_EFFECTS_NEON_SAMPLE
            </MotionText>
          </ShowcaseItem>
          <ShowcaseItem label="colors, duration={2000}">
            <MotionText
              effect="gradient"
              colors={CUSTOM_GRADIENT}
              duration={2000}
              variant="H2"
            >
              TEXT_EFFECTS_CUSTOM_GRADIENT_SAMPLE
            </MotionText>
          </ShowcaseItem>
        </ReplaySection>

        <ReplaySection
          replayAllKey={replayKey}
          title="TEXT_EFFECTS_SHIMMER"
          description={t("TEXT_EFFECTS_SHIMMER_DESC")}
        >
          <MotionText effect="shimmer" variant="lg">
            TEXT_EFFECTS_SHIMMER_SAMPLE
          </MotionText>
        </ReplaySection>

        <ReplaySection
          replayAllKey={replayKey}
          title="TEXT_EFFECTS_TYPING"
          description={t("TEXT_EFFECTS_TYPING_DESC")}
        >
          <MotionText effect="typing" variant="H3">
            TEXT_EFFECTS_TYPING_SAMPLE
          </MotionText>
          <ShowcaseItem label="speed={120}, hasCursor={false}">
            <MotionText
              effect="typing"
              speed={120}
              hasCursor={false}
              variant="md"
              color="body"
            >
              TEXT_EFFECTS_TYPING_SLOW_SAMPLE
            </MotionText>
          </ShowcaseItem>
        </ReplaySection>

        <ReplaySection
          replayAllKey={replayKey}
          title="TEXT_EFFECTS_WORDS"
          description={t("TEXT_EFFECTS_WORDS_DESC")}
        >
          <MotionText effect="words" variant="H3">
            WELCOME_TITLE
          </MotionText>
          <ShowcaseItem label='preset="pop"'>
            <MotionText effect="words" preset="pop" variant="H3">
              TEXT_EFFECTS_WORDS_POP_SAMPLE
            </MotionText>
          </ShowcaseItem>
        </ReplaySection>

        <ReplaySection
          replayAllKey={replayKey}
          title="TEXT_EFFECTS_LETTERS"
          description={t("TEXT_EFFECTS_LETTERS_DESC")}
        >
          <MotionText effect="letters" variant="H2">
            TEXT_EFFECTS_LETTERS_SAMPLE
          </MotionText>
          <ShowcaseItem label='preset="fadeDown"'>
            <MotionText effect="letters" preset="fadeDown" variant="H2">
              TEXT_EFFECTS_LETTERS_DROP_SAMPLE
            </MotionText>
          </ShowcaseItem>
        </ReplaySection>

        <ReplaySection
          replayAllKey={replayKey}
          title="TEXT_EFFECTS_COUNT"
          description={t("TEXT_EFFECTS_COUNT_DESC")}
        >
          <MotionText effect="count" to={1250} variant="H1" />
          <ShowcaseItem label={t("TEXT_EFFECTS_PRICE_FORMAT")}>
            <MotionText
              effect="count"
              to={49.99}
              format={formatPrice}
              variant="H2"
              color="primary"
            />
          </ShowcaseItem>
        </ReplaySection>
      </View>
    </ScreenWrapper>
  );
}
