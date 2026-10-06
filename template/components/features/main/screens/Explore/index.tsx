import { Fragment, useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { SheetManager } from "react-native-actions-sheet";
import { Orb, GradientSurface, Icon, Input, PressableScale, Text } from "@/components/shared/ui";
import Spacing from "@/constants/Spacing";
import RandomModal from "@/components/shared/wrappers/modals/randomModal";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { iconsListType } from "@/@types/mainTypes";
import styles from "./styles";

type ExploreRow = {
  icon: iconsListType;
  title: string;
  caption: string;
  onPress: () => void;
};

const Explore = () => {
  const router = useRouter();
  const [isModalShown, setisModalShown] = useState(false);

  const handleOpenActionSheet = async () => {
    const payload = await SheetManager.show("random-bottom-sheet", {
      payload: { title: "Random Sheet" },
    });
    if (payload?.decision) {
      // Do something with the decision
    } else {
      // Do something else
    }
  };

  const handleOpenModal = () => {
    setisModalShown(true);
  };

  const overlayRows: ExploreRow[] = [
    {
      icon: "layers",
      title: "exploreModalTitle",
      caption: "exploreModalCaption",
      onPress: handleOpenModal,
    },
  ];

  const screenRows: ExploreRow[] = [
    {
      icon: "moon",
      title: "exploreAppearanceTitle",
      caption: "exploreAppearanceCaption",
      onPress: () => router.push("/(main)/screen1"),
    },
    {
      icon: "share",
      title: "exploreParamsTitle",
      caption: "exploreParamsCaption",
      onPress: () =>
        router.push({
          pathname: "/(main)/screen2",
          params: { id: 1, from: "Explore" },
        }),
    },
    {
      icon: "list",
      title: "exploreListTitle",
      caption: "exploreListCaption",
      onPress: () => router.push("/(main)/screen3"),
    },
  ];

  const renderRows = (rows: ExploreRow[]) => (
    <View style={styles.listCard}>
      {rows.map((row, index) => (
        <Fragment key={row.title}>
          {index > 0 && <View style={styles.rowDivider} />}
          <PressableScale
            style={styles.row}
            pressedScale={0.98}
            onPress={row.onPress}
          >
            <View style={styles.rowIcon}>
              <Icon name={row.icon} size={20} color="action" />
            </View>
            <View style={styles.rowText}>
              <Text size={15} fontFamily="font600">
                {row.title}
              </Text>
              <Text variant="xsm" color="caption">
                {row.caption}
              </Text>
            </View>
            <View style={GLOBAL_STYLES.flipInArabic}>
              <Icon name="chevronRight" size={18} color="caption" />
            </View>
          </PressableScale>
        </Fragment>
      ))}
    </View>
  );

  return (
    <ScreenWrapper variant="main" isScrollable style={styles.screen}>
      <View style={styles.header}>
        <Text variant="H1">exploreTitle</Text>
        <Text variant="md" color="body">
          exploreSubtitle
        </Text>
      </View>

      <View>
        <Input
          placeholder="exploreSearch"
          isSearch
          prefix={<Icon name="search" size={18} color="caption" />}
        />
      </View>

      <View>
      <PressableScale pressedScale={0.98} onPress={handleOpenActionSheet}>
      <GradientSurface style={styles.featuredCard}>
        <Orb size={Spacing.x14 * 2.5} style={styles.featuredOrb} />
        <Orb size={Spacing.x14} style={styles.featuredOrbSmall} opacity={0.08} />
        <View style={styles.featuredIcon}>
          <Icon name="grid" size={22} color="onAction" />
        </View>
        <Text variant="H4" color="onAction">
          exploreSheetTitle
        </Text>
        <Text variant="sm" color="onAction" style={styles.featuredBody}>
          exploreSheetCaption
        </Text>
        <View style={styles.featuredCta}>
          <Text size={13} fontFamily="font600" color="primary">
            openActionSheet
          </Text>
          <View style={GLOBAL_STYLES.flipInArabic}>
            <Icon name="arrowRight" size={16} color="action" />
          </View>
        </View>
      </GradientSurface>
      </PressableScale>
      </View>

      <View style={styles.section}>
        <Text variant="xsm" color="caption" style={styles.sectionLabel}>
          exploreOverlaysLabel
        </Text>
        {renderRows(overlayRows)}
      </View>

      <View style={styles.section}>
        <Text variant="xsm" color="caption" style={styles.sectionLabel}>
          exploreScreensLabel
        </Text>
        {renderRows(screenRows)}
      </View>

      {isModalShown && (
        <RandomModal
          isVisible={isModalShown}
          setVisible={setisModalShown}
          onSubmit={() => {}}
        />
      )}
    </ScreenWrapper>
  );
};

export default Explore;
