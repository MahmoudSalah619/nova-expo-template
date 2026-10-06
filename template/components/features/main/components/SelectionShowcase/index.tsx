import { useState } from "react";
import { View } from "react-native";
import { Checkbox, RadioButton, Switch, Text } from "@/components/shared/ui";
import { CITY_OPTIONS } from "../../constants";
import ShowcaseItem from "../ShowcaseItem";
import ShowcaseSection from "../ShowcaseSection";
import styles from "./styles";

const RADIO_OPTIONS = CITY_OPTIONS.slice(0, 3);

export default function SelectionShowcase() {
  const [isChecked, setIsChecked] = useState(true);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isNotificationsOn, setIsNotificationsOn] = useState(true);
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);
  const [selectedCity, setSelectedCity] = useState(RADIO_OPTIONS[0].value);

  return (
    <ShowcaseSection
      title="Selection controls"
      description="Checkbox, Switch and RadioButton in their label positions and states."
    >
      <ShowcaseItem label="Checkbox">
        <Checkbox checked={isChecked} onPress={() => setIsChecked((value) => !value)} />
        <Checkbox
          label="Label on the left"
          labelPosition="left"
          checked={isTermsAccepted}
          onPress={() => setIsTermsAccepted((value) => !value)}
        />
        <Checkbox
          label="Label on the right"
          checked={isChecked}
          onPress={() => setIsChecked((value) => !value)}
        />
      </ShowcaseItem>

      <ShowcaseItem label="Switch">
        <Switch value={isNotificationsOn} onValueChange={setIsNotificationsOn} />
        <Switch
          label="Label on the left"
          labelPosition="left"
          value={isDarkModeOn}
          onValueChange={setIsDarkModeOn}
        />
        <Switch label="Disabled" value disabled onValueChange={() => {}} />
      </ShowcaseItem>

      <ShowcaseItem label="Radio button">
        {RADIO_OPTIONS.map((option) => (
          <View key={option.value} style={styles.radioRow}>
            <RadioButton
              selected={selectedCity === option.value}
              onPress={() => setSelectedCity(option.value)}
            />
            <Text variant="md">{option.label}</Text>
          </View>
        ))}
        <View style={styles.radioRow}>
          <RadioButton selected={false} disabled />
          <Text variant="md" color="disabled">
            Disabled
          </Text>
        </View>
      </ShowcaseItem>
    </ShowcaseSection>
  );
}
