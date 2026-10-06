import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { AccordionItem, Collapsible, RotateArrow, Text } from "@/components/shared/ui";
import ShowcaseItem from "../ShowcaseItem";
import ShowcaseSection from "../ShowcaseSection";
import styles from "./styles";

export default function DisclosureShowcase() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const isExpanded = useSharedValue(false);

  const toggleAccordion = () => {
    isExpanded.value = !isAccordionOpen;
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <ShowcaseSection
      title="Disclosure"
      description="Collapsible, and AccordionItem driven by RotateArrow."
    >
      <ShowcaseItem label="Collapsible">
        <Collapsible title="What is Nova">
          <Text variant="sm" color="body" autoTranslate={false}>
            An Expo template with a feature-based component structure.
          </Text>
        </Collapsible>
      </ShowcaseItem>

      <ShowcaseItem label="Accordion item and rotate arrow">
        <TouchableOpacity style={styles.accordionHeader} onPress={toggleAccordion}>
          <Text variant="md" fontFamily="font600">
            Toggle accordion
          </Text>
          <RotateArrow isOpen={isAccordionOpen} />
        </TouchableOpacity>
        <AccordionItem isExpanded={isExpanded} viewKey="showcase">
          <Text variant="sm" color="body" autoTranslate={false}>
            The height animates with Reanimated while the arrow rotates.
          </Text>
        </AccordionItem>
      </ShowcaseItem>
    </ShowcaseSection>
  );
}
