import { useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import {
  Button,
  Icon,
  MotionView,
  Skeleton,
  SkeletonText,
  Text,
} from "@/components/shared/ui";
import ShowcaseSection from "../../components/ShowcaseSection";
import styles from "./styles";

const AVATAR_SIZE = 48;
const LIST_ROWS = [0, 1, 2];
const SIMULATED_LOADING_MS = 2000;

function ProfileRowSkeleton() {
  return (
    <View style={styles.row}>
      <Skeleton height={AVATAR_SIZE} isCircle />
      <View style={styles.rowText}>
        <Skeleton width="55%" height={14} />
        <Skeleton width="35%" height={10} />
      </View>
    </View>
  );
}

/** Examples of Skeleton placeholders. Not used in the app's real screens. */
export default function SkeletonShowcase() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setIsLoading(false), SIMULATED_LOADING_MS);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <ScreenWrapper variant="main" isScrollable>
      <View style={styles.header}>
        <Text variant="H2">SKELETON</Text>
        <Text variant="md" color="body">
          SKELETON_SUBTITLE
        </Text>
      </View>

      <View style={styles.sections}>
        <ShowcaseSection
          title="SKELETON_PROFILE"
          description={t("SKELETON_PROFILE_DESC")}
        >
          <ProfileRowSkeleton />
        </ShowcaseSection>

        <ShowcaseSection
          title="SKELETON_CARD"
          description={t("SKELETON_CARD_DESC")}
        >
          <View style={styles.card}>
            <Skeleton height={140} radius={16} />
            <Skeleton width="70%" height={18} />
            <SkeletonText lines={3} />
          </View>
        </ShowcaseSection>

        <ShowcaseSection
          title="SKELETON_LIST"
          description={t("SKELETON_LIST_DESC")}
        >
          {LIST_ROWS.map((row) => (
            <ProfileRowSkeleton key={row} />
          ))}
        </ShowcaseSection>

        <ShowcaseSection
          title="SKELETON_PULSE"
          description={t("SKELETON_PULSE_DESC")}
        >
          <View style={styles.row}>
            <Skeleton height={AVATAR_SIZE} isCircle animation="pulse" />
            <SkeletonText lines={2} animation="pulse" style={styles.rowText} />
          </View>
        </ShowcaseSection>

        <ShowcaseSection
          title="SKELETON_SWAP"
          description={t("SKELETON_SWAP_DESC")}
        >
          {isLoading ? (
            <ProfileRowSkeleton />
          ) : (
            <MotionView preset="fade" style={styles.row}>
              <View style={styles.avatar}>
                <Icon name="user" size={22} color="action" />
              </View>
              <View style={styles.rowText}>
                <Text size={15} fontFamily="font600">
                  DEMO_USER_NAME
                </Text>
                <Text variant="xsm" color="caption">
                  HOME_SHORTCUT_PROFILE_CAPTION
                </Text>
              </View>
            </MotionView>
          )}
          <Button
            title="SKELETON_SIMULATE"
            size="md"
            variant="outlined"
            disabled={isLoading}
            onPress={() => setIsLoading(true)}
          />
        </ShowcaseSection>
      </View>
    </ScreenWrapper>
  );
}
