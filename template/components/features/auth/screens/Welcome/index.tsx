import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { Button, Orb, GradientSurface, Icon, Text } from "@/components/shared/ui";
import Spacing from "@/constants/Spacing";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import { iconsListType } from "@/@types/mainTypes";
import styles from "./styles";

const FEATURES: { icon: iconsListType; title: string; caption: string }[] = [
  { icon: "layers", title: "featureComponents", caption: "featureComponentsCaption" },
  { icon: "sliders", title: "featureCustomizable", caption: "featureCustomizableCaption" },
  { icon: "zap", title: "featureFast", caption: "featureFastCaption" },
  { icon: "code", title: "featureDeveloper", caption: "featureDeveloperCaption" },
];

const Welcome = () => {
  const router = useRouter();

  return (
    <ScreenWrapper paddingSize="sm" showHeader={false} isScrollable>
      <View style={styles.container}>
        <View>
          <GradientSurface style={styles.hero}>
            <Orb size={Spacing.x14 * 4} style={styles.heroOrbLarge} />
            <Orb size={Spacing.x14 * 2} style={styles.heroOrbSmall} opacity={0.08} />
          <View style={styles.heroBadge}>
            <Icon name="star" size={12} color="onAction" />
            <Text variant="xsm" color="onAction">
              welcomeBadge
            </Text>
          </View>
          <Text variant="H1" color="onAction">
            welcomeHeadline
          </Text>
          <Text variant="md" color="onAction" style={styles.heroBody}>
            welcomeBody
          </Text>
          </GradientSurface>
        </View>

        <View style={styles.featuresGrid}>
          {FEATURES.map((feature, index) => (
            <View key={feature.title} style={styles.featureCard}>
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
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Button
            title="createAccount"
            suffix={<Icon name="arrowRight" size={18} color="onAction" />}
            onPress={() => router.push("/(auth)/signup")}
          />
          <Button
            title="haveAccount"
            variant="outlined"
            onPress={() => router.push("/(auth)/login")}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;
