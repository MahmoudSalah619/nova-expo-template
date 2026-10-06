import { iconsList } from "@/components/shared/ui/Icon/list";
import { COLORS } from "@/constants/Colors";

export type themeType = keyof typeof COLORS;
export type colorGroupType = keyof typeof COLORS.light;
export type textColorType = keyof typeof COLORS.light.text;
export type backgroundColorType = keyof typeof COLORS.light.Surface;
export type iconsColorType = keyof typeof COLORS.light.icon;
export type borderColorType = keyof typeof COLORS.light.border;
export type iconsListType = keyof typeof iconsList;
