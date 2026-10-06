import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { Button, Loading, NoResults, ProgressLine, Text } from "@/components/shared/ui";
import { PROGRESS_STEP, PROGRESS_TOTAL } from "../../constants";
import ShowcaseItem from "../ShowcaseItem";
import ShowcaseSection from "../ShowcaseSection";
import styles from "./styles";

export default function FeedbackShowcase() {
  const [progress, setProgress] = useState(PROGRESS_STEP);

  const advanceProgress = () =>
    setProgress((value) => (value >= PROGRESS_TOTAL ? 0 : value + PROGRESS_STEP));

  return (
    <ShowcaseSection
      title="Feedback"
      description="ProgressLine, Loading, NoResults and toast messages (Snackbar)."
    >
      <ShowcaseItem label="Progress line">
        <ProgressLine progress={25} />
        <ProgressLine progress={60} customHeight={4} />
        <ProgressLine progress={progress} total={PROGRESS_TOTAL} customHeight={12} />
        <View style={styles.row}>
          <Text variant="sm" color="body" autoTranslate={false}>
            {`${progress} / ${PROGRESS_TOTAL}`}
          </Text>
          <Button title="Advance" size="sm" variant="outlined" onPress={advanceProgress} />
        </View>
      </ShowcaseItem>

      <ShowcaseItem label="Loading">
        <View style={styles.loadingBox}>
          <Loading />
        </View>
      </ShowcaseItem>

      <ShowcaseItem label="No results">
        <NoResults />
        <NoResults text="No notifications yet" />
      </ShowcaseItem>

      <ShowcaseItem label="Toast" isRow>
        <Button
          title="Success toast"
          size="md"
          onPress={() =>
            Toast.show({ type: "success", text1: "Saved", text2: "Your changes were saved" })
          }
        />
        <Button
          title="Error toast"
          size="md"
          variant="destructive"
          onPress={() =>
            Toast.show({ type: "error", text1: "Failed", text2: "Something went wrong" })
          }
        />
      </ShowcaseItem>
    </ShowcaseSection>
  );
}
