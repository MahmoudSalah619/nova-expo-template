import { Text as RNText } from "react-native";

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
 * @property {string} [type="default"] - Type of the text.
 * @example
 * <Text type="title" color="primary">Title</Text>
 * <Text type="default" color="text">Default</Text>
 * <Text type="defaultSemiBold" color="text">Default Semi Bold</Text>
 */

export default function Text({
  style,
  color = "text",
  lightColor,
  darkColor,
  type = "default",
  autoTranslate = true,
  ...rest
}: CustomTextProps) {
  const { t } = useAutoCompleteTranslation();

  const themedColor = useThemeColor(
    {
      light: lightColor ? COLORS.light[lightColor as keyof typeof COLORS.light] : undefined,
      dark: darkColor ? COLORS.dark[darkColor as keyof typeof COLORS.dark] : undefined,
    },
    color
  );

  return (
    <RNText
      style={[
        { color: themedColor },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "bell" ? styles.bell : undefined,
        styles.text,
        style,
      ]}
      {...rest}
    >
      {autoTranslate ? t(rest.children) : rest.children}
    </RNText>
  );
}
