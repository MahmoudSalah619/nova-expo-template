import { I18nManager, Text as RNText, TextStyle } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { COLORS } from "@/constants/Colors";
import { CustomTextProps } from "./types";
import styles from "./styles";
import useAutoCompleteTranslation from "@/hooks/useAutoCompleteTranslation";

/**
 * Text component that uses the current theme color.
 * @param props - Text component props.
 * @returns Text component.
 * @property {string} [color="text"] - Color of the text.
 * @property {string} [lightColor] - Light color of the text.
 * @property {string} [darkColor] - Dark color of the text.
 * @property {number} [size=14] - Size of the text.
 * @property {string} [type="default"] - Type of the text.
 * @example
 * <Text type="title" color="primary">Title</Text>
 * <Text type="default" color="text">Default</Text>
 * <Text type="defaultSemiBold" color="text">Default Semi Bold</Text>
 */

export default function Text({
  style,
  size = 14,
  weight = 400,
  lineHeight,
  isCentered,
  fontFamily = "cosmica",
  color = "text",
  lightColor,
  darkColor,
  type,
  autoTranslate = true,
  ...rest
}: CustomTextProps) {
  const { t } = useAutoCompleteTranslation();

  const themedColor = useThemeColor(
    {
      light: lightColor
        ? COLORS.light[lightColor as keyof typeof COLORS.light]
        : undefined,
      dark: darkColor
        ? COLORS.dark[darkColor as keyof typeof COLORS.dark]
        : undefined,
    },
    color
  );
  const textStyle: TextStyle = {
    color: themedColor,
    fontSize: size,
    textAlign: isCentered ? "center" : undefined,
    lineHeight: lineHeight || undefined,
    fontFamily: !type ? `${fontFamily}_${weight}` : undefined,
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
  };

  return (
    <RNText
      style={[
        { ...textStyle },
        type ? styles?.[type] : undefined,
        styles.text,
        style,
      ]}
      {...rest}
    >
      {autoTranslate ? t(String(rest.children)) : rest.children}
    </RNText>
  );
}
