import { AnimatedSwitch } from "@/components/vendor/reactICX/Switch";
import { Text } from "@/components/atoms";
import { View, StyleSheet } from "react-native";
import type { SwitchProps } from "./types";
import {
  DEFAULT_HEIGHT,
  DEFAULT_OFF_COLOR,
  DEFAULT_ON_COLOR,
  DEFAULT_THUMB_COLOR,
  DEFAULT_THUMB_INSET,
  DEFAULT_WIDTH,
} from "./conf";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Switch({
  value,
  onValueChange,
  disabled = false,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  onColor = DEFAULT_ON_COLOR,
  offColor = DEFAULT_OFF_COLOR,
  thumbColor = DEFAULT_THUMB_COLOR,
  thumbInset = DEFAULT_THUMB_INSET,
  label,
  labelPosition = "right",
  style,
  ...otherProps
}: SwitchProps): React.JSX.Element {
  const textColor = useThemeColor({}, "text");

  const switchComponent = (
    <AnimatedSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      width={width}
      height={height}
      onColor={onColor}
      offColor={offColor}
      thumbColor={thumbColor}
      thumbInset={thumbInset}
      style={style}
      {...otherProps}
    />
  );

  if (!label) {
    return switchComponent;
  }

  return (
    <View
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
      {switchComponent}
    </View>
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
    marginLeft: 12,
  },
  labelRight: {
    marginRight: 12,
  },
});
