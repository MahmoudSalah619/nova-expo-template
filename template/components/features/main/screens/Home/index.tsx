import React from "react";
import { View } from "react-native";
import { Href, useRouter } from "expo-router";
import { Orb, GradientSurface, Icon, PressableScale, Text } from "@/components/shared/ui";
import Spacing from "@/constants/Spacing";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { iconsListType } from "@/@types/mainTypes";
import styles from "./styles";

const QUICK_ACTIONS: {
  icon: iconsListType;
  title: string;
  caption: string;
  href: Href;
}[] = [
  { icon: "compass", title: "EXPLORE", caption: "HOME_SHORTCUT_EXPLORE_CAPTION", href: "/(main)/(tabs)/Explore" },
  { icon: "heart", title: "FAVORITES", caption: "HOME_SHORTCUT_FAVORITES_CAPTION", href: "/(main)/(tabs)/favourites" },
  { icon: "user", title: "PROFILE", caption: "HOME_SHORTCUT_PROFILE_CAPTION", href: "/(main)/(tabs)/profile" },
  { icon: "moon", title: "APPEARANCE", caption: "HOME_SHORTCUT_APPEARANCE_CAPTION", href: "/(main)/screen1" },
];

const Home = () => {
  const router = useRouter();

  return (
    <ScreenWrapper variant="main" isScrollable style={styles.screen}>
      <View style={styles.greeting}>
        <Text variant="sm" color="caption">
          HOME_GREETING
        </Text>
        <Text variant="H1">DEMO_USER_NAME</Text>
      </View>

      <View>
      <GradientSurface style={styles.hero}>
        <Orb size={Spacing.x14 * 3} style={styles.heroOrb} />
        <Orb size={Spacing.x14 * 1.5} style={styles.heroOrbSmall} opacity={0.08} />
        <Text variant="H3" color="onAction">
          HOME_HERO_TITLE
        </Text>
        <Text variant="md" color="onAction" style={styles.heroBody}>
          HOME_HERO_BODY
        </Text>
        <PressableScale
          style={styles.heroCta}
          pressedScale={0.95}
          onPress={() => router.push("/(main)/(tabs)/Explore")}
        >
          <Text size={13} fontFamily="font600" color="primary">
            HOME_HERO_ACTION
          </Text>
          <View style={GLOBAL_STYLES.flipInArabic}>
            <Icon name="arrowRight" size={16} color="action" />
          </View>
        </PressableScale>
      </GradientSurface>
      </View>

      <View style={styles.section}>
        <Text variant="xsm" color="caption" style={styles.sectionLabel}>
          HOME_SHORTCUTS_LABEL
        </Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <View key={action.title} style={styles.actionCardWrapper}>
            <PressableScale
              style={styles.actionCard}
              onPress={() => router.push(action.href)}
            >
              <View style={styles.actionIcon}>
                <Icon name={action.icon} size={20} color="action" />
              </View>
              <View>
                <Text size={15} fontFamily="font600" lineHeight={20}>
                  {action.title}
                </Text>
                <Text variant="xsm" color="caption">
                  {action.caption}
                </Text>
              </View>
            </PressableScale>
            </View>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Home;
