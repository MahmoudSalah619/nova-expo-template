import { View as RNView, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslation } from "react-i18next";

export type CustomViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: CustomViewProps) {
  const { i18n } = useTranslation();
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <RNView
      style={[{ backgroundColor, direction: i18n.dir() }, style]}
      {...otherProps}
    />
  );
}
