import type { ComponentRef } from "react";
import type { TextInput, View } from "react-native";
import { iconsList } from "@/components/shared/ui/Icon/list";
import { COLORS } from "@/constants/Colors";

export type themeType = keyof typeof COLORS;
export type colorGroupType = keyof typeof COLORS.light;
export type textColorType = keyof typeof COLORS.light.text;
export type backgroundColorType = keyof typeof COLORS.light.Surface;
export type iconsColorType = keyof typeof COLORS.light.icon;
export type borderColorType = keyof typeof COLORS.light.border;
export type iconsListType = keyof typeof iconsList;

/**
 * Ref instance types. Since RN 0.88, `View`/`TextInput` are function
 * components, so `useRef<View>` no longer yields the host instance type.
 */
export type ViewRef = ComponentRef<typeof View>;
export type TextInputRef = ComponentRef<typeof TextInput>;
