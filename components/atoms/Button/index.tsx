import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { COLORS } from "@/constants/Colors";
import getShadowStyle from "@/utils/getShadowStyle";
import { ButtonProps } from "./types";
import Text from "@/components/atoms/Text";
import styles from "./styles";
import { theme } from "@/utils/getTheme";

export default function Button({
  title,
  onPress,
  color = COLORS[theme].white,
  backgroundColor = COLORS[theme].primary,
  borderColor,
  disabled = false,
  btnHeight = 40,
  buttonCustomStyle,
  textCustomStyle,
  fontSize = 16,
  iconSize = 18,
  prefix,
  icon,
  IconName,
  isLoading,
  suffix,
  isFullWidth = false,
  fontFamily = "font500",
  showShadow = false,
}: ButtonProps) {
  const customStyle: ViewStyle = {
    backgroundColor: disabled ? COLORS[theme].grey : backgroundColor,
    borderColor,
    borderWidth: borderColor ? 1 : 0,
    height: btnHeight,
    flex: isFullWidth ? 1 : undefined,
    ...buttonCustomStyle,
  };

  const textExtraStyle = { color, fontSize, fontFamily };

  const hasTitle = !!title;

  return (
    <TouchableOpacity
      style={[styles.button, customStyle, showShadow && getShadowStyle()]}
      disabled={disabled || isLoading}
      activeOpacity={disabled ? 1 : 0.2}
      onPress={onPress}
    >
      {!isLoading ? (
        <View style={GLOBAL_STYLES.row}>
          {prefix && <View style={styles.prefixSpacing}>{prefix}</View>}
          {(IconName || icon) && <View style={styles.prefixSpacing}></View>}

          {hasTitle && (
            <Text style={[styles.text, textExtraStyle, textCustomStyle]}>
              {title}
            </Text>
          )}

          {suffix && <View style={styles.suffixSpacing}>{suffix}</View>}
        </View>
      ) : (
        <ActivityIndicator color={color} size={24} />
      )}
    </TouchableOpacity>
  );
}
