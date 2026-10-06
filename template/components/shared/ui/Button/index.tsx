import { ActivityIndicator, TouchableOpacity, View } from "react-native";

import Text from "@/components/shared/ui/Text/Base";
import { COLORS } from "@/constants/Colors";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { theme } from "@/utils/getTheme";
import { SIZE_CONFIG, VARIANT_CONFIG } from "./ButtonEnums";
import { ButtonProps } from "./types";
import styles from "./styles";

/**
 * Button driven by `variant` (look) and `size` (height + text preset).
 * @example
 * <Button title="Login" onPress={onLogin} />
 * <Button title="Cancel" variant="outlined" size="md" onPress={onCancel} />
 * <Button title="Delete" variant="destructive" isLoading={isDeleting} onPress={onDelete} />
 */
export default function Button({
  title,
  size = "lg",
  onPress,
  disabled = false,
  containerStyle,
  prefix,
  isLoading,
  suffix,
  isFullWidth = false,
  variant = "primary",
}: ButtonProps) {
  const sizeData = SIZE_CONFIG[size];
  const variantData = VARIANT_CONFIG[variant];

  const isDisabled = disabled || isLoading;

  const resolvedBtnStyle = disabled
    ? variantData.disabledBtnStyle
    : variantData.btnStyle;
  const textColor = disabled ? "disabled" : variantData.textColor;

  const buttonCustomStyle = {
    ...styles.button,
    ...resolvedBtnStyle,
    height: sizeData.height,
    flex: isFullWidth ? 1 : undefined,
    ...containerStyle,
  };

  return (
    <TouchableOpacity
      style={buttonCustomStyle}
      disabled={isDisabled}
      activeOpacity={disabled ? 1 : 0.2}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS[theme].text[textColor]} size={24} />
      ) : (
        <View style={GLOBAL_STYLES.row}>
          {prefix && <View style={styles.prefixSpacing}>{prefix}</View>}

          {!!title && (
            <Text variant={sizeData.textVariant} color={textColor}>
              {title}
            </Text>
          )}

          {suffix && <View style={styles.suffixSpacing}>{suffix}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}
