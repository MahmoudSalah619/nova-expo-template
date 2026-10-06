import { View } from "react-native";
import { Text } from "@/components/shared/ui";
import AnimatedText from "@/components/shared/ui/Text/AnimatedText";
import FadeText from "@/components/shared/ui/Text/FadeText";
import {
  ANIMATED_TEXTS,
  FONT_WEIGHTS,
  TEXT_COLORS,
  TEXT_VARIANTS,
} from "../../constants";
import ShowcaseItem from "../ShowcaseItem";
import ShowcaseSection from "../ShowcaseSection";
import styles from "./styles";

export default function TextShowcase() {
  return (
    <ShowcaseSection
      title="Text"
      description="Every typography variant, text color and font weight."
    >
      <ShowcaseItem label="Variants">
        {TEXT_VARIANTS.map((variant) => (
          <View key={variant} style={styles.variantRow}>
            <Text variant="xsm" color="caption" style={styles.token}>
              {variant}
            </Text>
            <Text variant={variant} numberOfLines={1} style={styles.sample}>
              Nova template
            </Text>
          </View>
        ))}
      </ShowcaseItem>

      <ShowcaseItem label="Colors" isRow>
        {TEXT_COLORS.map((color) => (
          <Text key={color} variant="md" color={color} style={styles.chip}>
            {color}
          </Text>
        ))}
      </ShowcaseItem>

      <ShowcaseItem label="Font weights">
        {FONT_WEIGHTS.map((fontFamily) => (
          <Text key={fontFamily} size={16} fontFamily={fontFamily}>
            {fontFamily}
          </Text>
        ))}
      </ShowcaseItem>

      <ShowcaseItem label="Alignment">
        <Text variant="md">Start aligned</Text>
        <Text variant="md" isCentered>
          Centered
        </Text>
      </ShowcaseItem>

      <ShowcaseItem label="Animated text">
        <AnimatedText TEXTS={ANIMATED_TEXTS} />
      </ShowcaseItem>

      <ShowcaseItem label="Fade text">
        <FadeText text="Words fade in one by one" variant="lg" />
      </ShowcaseItem>
    </ShowcaseSection>
  );
}
