import { useState } from "react";
import { View } from "react-native";

import { Button } from "@/components/shared/ui";
import ShowcaseSection from "../ShowcaseSection";
import { ReplaySectionProps } from "./types";
import styles from "./styles";

/**
 * ShowcaseSection with its own Replay button under the examples. Replaying
 * remounts the examples, which restarts their animations. Changing
 * `replayAllKey` (the page-level Replay) replays every section at once.
 */
export default function ReplaySection({
  replayAllKey = 0,
  children,
  ...sectionProps
}: ReplaySectionProps) {
  const [replayKey, setReplayKey] = useState(0);
  const replay = () => setReplayKey((key) => key + 1);

  return (
    <ShowcaseSection {...sectionProps}>
      <View key={`${replayAllKey}-${replayKey}`} style={styles.examples}>
        {children}
      </View>
      <Button
        title="MOTION_REPLAY"
        size="sm"
        variant="outlined"
        onPress={replay}
      />
    </ShowcaseSection>
  );
}
