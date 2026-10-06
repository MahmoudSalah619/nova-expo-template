import { I18nManager, Text as RNText, TextStyle } from "react-native";
import { useTranslation } from "react-i18next";

import FontFamily from "@/constants/FontFamily";
import { moderateScale } from "@/constants/Metrics";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CustomTextProps } from "./types";
import styles from "./styles";

/**
 * Themed text with typography variants.
 * @example
 * <Text variant="H1" color="primary">Title</Text>
 * <Text variant="md">Body</Text>
 * <Text size={18} fontFamily="font700">Custom</Text>
 */
export default function Text({
  style,
  size = 14,
  lineHeight,
  isCentered,
  fontFamily = "font400",
  color = "heading",
  variant,
  autoTranslate = true,
  preventDarkModeColor = false,
  ...rest
}: CustomTextProps) {
  const { t } = useTranslation();
  const { targetColor } = useThemeColor("text", color, preventDarkModeColor);

  const textStyle: TextStyle = {
    color: targetColor,
    fontSize: moderateScale(size),
    textAlign: isCentered ? "center" : undefined,
    lineHeight: lineHeight || undefined,
    fontFamily: !variant ? FontFamily[fontFamily] : undefined,
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
  };

  return (
    <RNText
      style={[
        textStyle,
        variant ? styles[variant] : undefined,
        styles.text,
        style,
      ]}
      allowFontScaling={false}
      {...rest}
    >
      {autoTranslate ? t(String(rest.children)) : rest.children}
    </RNText>
  );
}
