import { Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import { Button, MotionButton, Text } from "@/components/shared/ui";
import { COLORS } from "@/constants/Colors";
import { theme } from "@/utils/getTheme";
import ShowcaseItem from "../../components/ShowcaseItem";
import ShowcaseSection from "../../components/ShowcaseSection";
import styles from "./styles";

/**
 * One example per MotionButton effect. MotionButton wraps any pressable:
 * Pushable uses a plain Pressable (it stays solid, so only the push shows),
 * the others wrap the regular Button. The wrapped onPress still fires (a
 * toast confirms it).
 */
export default function MotionButtonShowcase() {
  const { t } = useTranslation();
  const confirmPress = () =>
    Toast.show({ type: "success", text1: t("BUTTON_EFFECTS_PRESSED") });

  return (
    <ScreenWrapper variant="main" isScrollable>
      <View style={styles.header}>
        <Text variant="H2">BUTTON_EFFECTS</Text>
        <Text variant="md" color="body">
          BUTTON_EFFECTS_SUBTITLE
        </Text>
      </View>

      <View style={styles.sections}>
        <ShowcaseSection
          title="BUTTON_EFFECTS_PUSHABLE"
          description={t("BUTTON_EFFECTS_PUSHABLE_DESC")}
        >
          <ShowcaseItem label="<Pressable>">
            <MotionButton effect="pushable">
              <Pressable
                accessibilityRole="button"
                style={styles.face}
                onPress={confirmPress}
              >
                <Text variant="lg" color="onAction">
                  BUTTON_EFFECTS_PRESS_ME
                </Text>
              </Pressable>
            </MotionButton>
          </ShowcaseItem>
          <ShowcaseItem label="<Pressable>, color">
            <MotionButton
              effect="pushable"
              color={COLORS[theme].Surface.dangerPressed}
            >
              <Pressable
                accessibilityRole="button"
                style={[styles.face, styles.faceDanger]}
                onPress={confirmPress}
              >
                <Text variant="lg" color="onAction">
                  BUTTON_EFFECTS_DELETE
                </Text>
              </Pressable>
            </MotionButton>
          </ShowcaseItem>
        </ShowcaseSection>

        <ShowcaseSection
          title="BUTTON_EFFECTS_SHINE"
          description={t("BUTTON_EFFECTS_SHINE_DESC")}
        >
          <MotionButton effect="shine">
            <Button title="BUTTON_EFFECTS_GET_STARTED" onPress={confirmPress} />
          </MotionButton>
        </ShowcaseSection>

        <ShowcaseSection
          title="BUTTON_EFFECTS_GLOW"
          description={t("BUTTON_EFFECTS_GLOW_DESC")}
        >
          <MotionButton effect="glow">
            <Button title="BUTTON_EFFECTS_PRESS_ME" onPress={confirmPress} />
          </MotionButton>
        </ShowcaseSection>

        <ShowcaseSection
          title="BUTTON_EFFECTS_BORDER_BEAM"
          description={t("BUTTON_EFFECTS_BORDER_BEAM_DESC")}
        >
          <MotionButton effect="borderBeam">
            <Button
              title="BUTTON_EFFECTS_UPGRADE"
              variant="outlined"
              onPress={confirmPress}
            />
          </MotionButton>
        </ShowcaseSection>

        <ShowcaseSection
          title="BUTTON_EFFECTS_SCALE"
          description={t("BUTTON_EFFECTS_SCALE_DESC")}
        >
          <MotionButton effect="scale">
            <Button
              title="BUTTON_EFFECTS_PRESS_ME"
              variant="outlined"
              onPress={confirmPress}
            />
          </MotionButton>
        </ShowcaseSection>
      </View>
    </ScreenWrapper>
  );
}
