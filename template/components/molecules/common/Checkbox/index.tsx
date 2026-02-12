import { Checkbox as ICXCheckbox } from "@/components/vendor/reactICX/Checkbox";
import { Text } from "@/components/atoms";
import { Pressable, StyleSheet } from "react-native";
import type { CheckboxProps } from "./types";
import { DEFAULT_CHECKMARK_COLOR, DEFAULT_SIZE, DEFAULT_STROKE } from "./conf";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Checkbox({
  checked = false,
  checkmarkColor,
  stroke = DEFAULT_STROKE,
  size = DEFAULT_SIZE,
  showBorder = true,
  onPress,
  containerStyle,
  label,
  labelPosition = "right",
}: CheckboxProps): React.JSX.Element {
  const textColor = useThemeColor({}, "text");
  const finalCheckmarkColor = checkmarkColor || DEFAULT_CHECKMARK_COLOR;

  const checkboxComponent = (
    <ICXCheckbox
      checked={checked}
      checkmarkColor={finalCheckmarkColor}
      stroke={stroke}
      size={size}
      showBorder={showBorder}
      containerStyle={containerStyle}
    />
  );

  if (!label) {
    return (
      <Pressable onPress={onPress}>
        {checkboxComponent}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        labelPosition === "left" && styles.containerReverse,
      ]}
    >
      {label && (
        <Text
          style={[
            styles.label,
            { color: textColor },
            labelPosition === "left" ? styles.labelLeft : styles.labelRight,
          ]}
        >
          {label}
        </Text>
      )}
      {checkboxComponent}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerReverse: {
    flexDirection: "row-reverse",
  },
  label: {
    fontSize: 14,
  },
  labelLeft: {
    marginLeft: 8,
  },
  labelRight: {
    marginRight: 8,
  },
});
