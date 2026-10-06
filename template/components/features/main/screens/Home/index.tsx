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
  { icon: "compass", title: "exploreTitle", caption: "homeExploreCaption", href: "/(main)/(tabs)/Explore" },
  { icon: "heart", title: "favouritesTitle", caption: "homeFavouritesCaption", href: "/(main)/(tabs)/favourites" },
  { icon: "user", title: "Profile", caption: "homeProfileCaption", href: "/(main)/(tabs)/profile" },
  { icon: "moon", title: "appearance", caption: "exploreAppearanceCaption", href: "/(main)/screen1" },
];

const Home = () => {
  const router = useRouter();

  return (
    <ScreenWrapper variant="main" isScrollable style={styles.screen}>
      <View style={styles.greeting}>
        <Text variant="sm" color="caption">
          homeGreeting
        </Text>
        <Text variant="H1">homeTitle</Text>
      </View>

      <View>
      <GradientSurface style={styles.hero}>
        <Orb size={Spacing.x14 * 3} style={styles.heroOrb} />
        <Orb size={Spacing.x14 * 1.5} style={styles.heroOrbSmall} opacity={0.08} />
        <Text variant="H3" color="onAction">
          homeHeroTitle
        </Text>
        <Text variant="md" color="onAction" style={styles.heroBody}>
          homeSubtitle
        </Text>
        <PressableScale
          style={styles.heroCta}
          pressedScale={0.95}
          onPress={() => router.push("/(main)/(tabs)/Explore")}
        >
          <Text size={13} fontFamily="font600" color="primary">
            homeHeroCta
          </Text>
          <View style={GLOBAL_STYLES.flipInArabic}>
            <Icon name="arrowRight" size={16} color="action" />
          </View>
        </PressableScale>
      </GradientSurface>
      </View>

      <View style={styles.section}>
        <Text variant="xsm" color="caption" style={styles.sectionLabel}>
          homeQuickActions
        </Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action, index) => (
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
