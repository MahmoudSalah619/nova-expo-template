import { View } from "react-native";
import ReactLogo from "@/assets/images/react-logo.png";
import {
  ExternalLink,
  Icon,
  Image,
  Logo,
  SeperateLine,
  ShadowWrapper,
  Text,
} from "@/components/shared/ui";
import { HelloWave } from "@/components/shared/ui/HelloWave";
import { Card } from "@/components/shared/wrappers";
import Spacing from "@/constants/Spacing";
import { ICON_COLORS, ICON_NAMES } from "../../constants";
import ShowcaseItem from "../ShowcaseItem";
import ShowcaseSection from "../ShowcaseSection";
import styles from "./styles";

export default function DisplayShowcase() {
  return (
    <ShowcaseSection
      title="Display"
      description="Icons, images, separators and surface wrappers."
    >
      <ShowcaseItem label="Icons" isRow>
        {ICON_NAMES.map((name) => (
          <View key={name} style={styles.iconTile}>
            <Icon name={name} size={24} color="primary" />
            <Text variant="xsm" color="caption" numberOfLines={1} autoTranslate={false}>
              {name}
            </Text>
          </View>
        ))}
      </ShowcaseItem>

      <ShowcaseItem label="Icon colors" isRow>
        {ICON_COLORS.map((color) => (
          <Icon key={color} name="heart" size={24} color={color} />
        ))}
      </ShowcaseItem>

      <ShowcaseItem label="Logo and image" isRow>
        <Logo width={96} height={72} />
        <Image source={ReactLogo} style={styles.image} />
        <HelloWave />
      </ShowcaseItem>

      <ShowcaseItem label="Separate line">
        <Text variant="sm">Above the line</Text>
        <SeperateLine />
        <Text variant="sm">Below the line</Text>
      </ShowcaseItem>

      <ShowcaseItem label="Card and shadow wrapper">
        <Card>
          <Text variant="lg" preventDarkModeColor>
            Card
          </Text>
          <Text variant="sm" color="body" autoTranslate={false}>
            A padded, elevated surface from shared/wrappers.
          </Text>
        </Card>
        <ShadowWrapper borderRadius={Spacing.x4} innerContainerStyle={styles.shadowInner}>
          <Text variant="lg" preventDarkModeColor>
            ShadowWrapper
          </Text>
        </ShadowWrapper>
      </ShowcaseItem>

      <ShowcaseItem label="External link">
        <ExternalLink href="https://docs.expo.dev">
          <Text variant="md" color="primary" autoTranslate={false}>
            Open the Expo docs
          </Text>
        </ExternalLink>
      </ShowcaseItem>
    </ShowcaseSection>
  );
}
