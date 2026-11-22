import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import {
  Button,
  Orb,
  GradientSurface,
  Icon,
  MotionView,
  Text,
} from "@/components/shared/ui";
import Spacing from "@/constants/Spacing";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import { iconsListType } from "@/@types/mainTypes";
import styles from "./styles";

const FEATURES: { icon: iconsListType; title: string; caption: string }[] = [
  {
    icon: "layers",
    title: "WELCOME_FEATURE_COMPONENTS",
    caption: "WELCOME_FEATURE_COMPONENTS_CAPTION",
  },
  {
    icon: "sliders",
    title: "WELCOME_FEATURE_THEMING",
    caption: "WELCOME_FEATURE_THEMING_CAPTION",
  },
  {
    icon: "zap",
    title: "WELCOME_FEATURE_PERFORMANCE",
    caption: "WELCOME_FEATURE_PERFORMANCE_CAPTION",
  },
  {
    icon: "code",
    title: "WELCOME_FEATURE_DEVELOPER",
    caption: "WELCOME_FEATURE_DEVELOPER_CAPTION",
  },
];

// Entrance sequence (ms): hero pops in, feature cards slide in from the left
// one by one, then the buttons rise from the bottom.
const FEATURES_DELAY = 500;
// slideLeft travels the full screen width, so it needs more time than the
// default 300ms, and a bigger gap so each card lands visibly on its own.
const CARD_DURATION = 600;
const CARD_STEP = 200;
// Buttons start once the last card has landed.
const ACTIONS_DELAY =
  FEATURES_DELAY + (FEATURES.length - 1) * CARD_STEP + CARD_DURATION;

const Welcome = () => {
  const router = useRouter();

  return (
    <ScreenWrapper paddingSize="sm" showHeader={false} isScrollable>
      <View style={styles.container}>
        <MotionView preset="pop">
          <GradientSurface style={styles.hero}>
            <Orb size={Spacing.x14 * 4} style={styles.heroOrbLarge} />
            <Orb
              size={Spacing.x14 * 2}
              style={styles.heroOrbSmall}
              opacity={0.08}
            />
            <View style={styles.heroBadge}>
              <Icon name="star" size={12} color="onAction" />
              <Text variant="xsm" color="onAction">
                WELCOME_BADGE
              </Text>
            </View>
            <Text variant="H1" color="onAction">
              WELCOME_TITLE
            </Text>
            <Text variant="md" color="onAction" style={styles.heroBody}>
              WELCOME_SUBTITLE
            </Text>
          </GradientSurface>
        </MotionView>

        <View style={styles.featuresGrid}>
          {FEATURES.map((feature, index) => (
            <MotionView
              key={feature.title}
              preset="slideLeft"
              duration={CARD_DURATION}
              delay={FEATURES_DELAY + index * CARD_STEP}
              style={styles.featureCard}
            >
              <View style={styles.featureIcon}>
                <Icon name={feature.icon} size={20} color="action" />
              </View>
              <View>
                <Text size={15} fontFamily="font600" lineHeight={20}>
                  {feature.title}
                </Text>
                <Text variant="xsm" color="caption">
                  {feature.caption}
                </Text>
              </View>
            </MotionView>
          ))}
        </View>

        <MotionView delay={ACTIONS_DELAY} style={styles.actions}>
          <Button
            title="CREATE_ACCOUNT"
            suffix={<Icon name="arrowRight" size={18} color="onAction" />}
            onPress={() => router.push("/(auth)/signup")}
          />
          <Button
            title="I_HAVE_AN_ACCOUNT"
            variant="outlined"
            onPress={() => router.push("/(auth)/login")}
          />
        </MotionView>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;
