import { View } from "react-native";

import {
  Button,
  MotionView,
  MOTION_PRESETS,
  MotionPreset,
  PressableScale,
  Text,
} from "@/components/shared/ui";
import ShowcaseItem from "../ShowcaseItem";
import ShowcaseSection from "../ShowcaseSection";
import { MotionPlaygroundProps } from "./types";
import styles from "./styles";

const PRESETS = Object.keys(MOTION_PRESETS) as MotionPreset[];
export const DURATION_OPTIONS = [150, 300, 600, 1000, 1500];
export const DELAY_OPTIONS = [0, 300, 800];

interface ChipGroupProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  formatLabel?: (value: T) => string;
}

function ChipGroup<T extends string | number>({
  options,
  value,
  onChange,
  formatLabel = String,
}: ChipGroupProps<T>) {
  return (
    <View style={styles.chips}>
      {options.map((option) => {
        const isSelected = option === value;
        return (
          <PressableScale
            key={option}
            hasHaptics={false}
            style={[styles.chip, isSelected && styles.chipSelected]}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onChange(option)}
          >
            <Text
              size={13}
              fontFamily="font600"
              color={isSelected ? "onAction" : "body"}
              autoTranslate={false}
            >
              {formatLabel(option)}
            </Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

const formatMs = (ms: number) => `${ms}ms`;

/**
 * Pick a preset, duration and delay, and preview the result live.
 * Every change replays the preview (the parent remounts it via `replayKey`).
 */
export default function MotionPlayground({
  preset,
  duration,
  delay,
  replayKey,
  onPresetChange,
  onDurationChange,
  onDelayChange,
  onReplay,
}: MotionPlaygroundProps) {
  return (
    <ShowcaseSection
      title="Playground"
      description="Duration applies to every example on this page."
    >
      <ShowcaseItem label="Effect">
        <ChipGroup options={PRESETS} value={preset} onChange={onPresetChange} />
      </ShowcaseItem>

      <ShowcaseItem label="Duration">
        <ChipGroup
          options={DURATION_OPTIONS}
          value={duration}
          onChange={onDurationChange}
          formatLabel={formatMs}
        />
      </ShowcaseItem>

      <ShowcaseItem label="Delay">
        <ChipGroup
          options={DELAY_OPTIONS}
          value={delay}
          onChange={onDelayChange}
          formatLabel={formatMs}
        />
      </ShowcaseItem>

      <View style={styles.stage}>
        <MotionView
          key={replayKey}
          preset={preset}
          duration={duration}
          delay={delay}
        >
          <View style={styles.previewBox}>
            <Text
              size={13}
              fontFamily="font600"
              color="onAction"
              autoTranslate={false}
            >
              {`${preset} · ${formatMs(duration)}`}
            </Text>
          </View>
        </MotionView>
      </View>

      <Button title="Play" size="md" variant="outlined" onPress={onReplay} />
    </ShowcaseSection>
  );
}
