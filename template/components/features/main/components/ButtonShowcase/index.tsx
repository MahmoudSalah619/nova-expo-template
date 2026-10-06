import { View } from "react-native";
import { Button, Icon } from "@/components/shared/ui";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "../../constants";
import ShowcaseItem from "../ShowcaseItem";
import ShowcaseSection from "../ShowcaseSection";
import styles from "./styles";

const noop = () => {};

export default function ButtonShowcase() {
  return (
    <ShowcaseSection
      title="Button"
      description="Every variant in every size, with disabled and loading states."
    >
      {BUTTON_VARIANTS.map((variant) => (
        <ShowcaseItem key={variant} label={variant}>
          <View style={styles.row}>
            {BUTTON_SIZES.map((size) => (
              <Button
                key={size}
                title={size}
                variant={variant}
                size={size}
                onPress={noop}
              />
            ))}
          </View>
          <View style={styles.row}>
            <Button title="Disabled" variant={variant} size="md" disabled onPress={noop} />
            <Button title="Loading" variant={variant} size="md" isLoading onPress={noop} />
          </View>
        </ShowcaseItem>
      ))}

      <ShowcaseItem label="With icons">
        <View style={styles.row}>
          <Button
            title="Prefix"
            size="md"
            prefix={<Icon name="heart" size={16} color="onAction" />}
            onPress={noop}
          />
          <Button
            title="Suffix"
            size="md"
            variant="outlined"
            suffix={<Icon name="arrowDown" size={14} color="primary" />}
            onPress={noop}
          />
          <Button
            size="md"
            variant="ghost"
            prefix={<Icon name="closeIcon" size={16} color="primary" />}
            onPress={noop}
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem label="Full width">
        <View style={styles.row}>
          <Button title="Full width" isFullWidth onPress={noop} />
        </View>
        <View style={styles.row}>
          <Button title="Confirm" isFullWidth onPress={noop} />
          <Button title="Cancel" variant="outlined" isFullWidth onPress={noop} />
        </View>
      </ShowcaseItem>
    </ShowcaseSection>
  );
}
