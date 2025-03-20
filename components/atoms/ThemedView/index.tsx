import { View as RNView, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

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
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <RNView style={[{ backgroundColor }, style]} {...otherProps} />;
}
