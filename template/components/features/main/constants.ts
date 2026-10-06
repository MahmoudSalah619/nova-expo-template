import type { iconsColorType, textColorType } from "@/@types/mainTypes";
import type { ButtonSize, ButtonVariant } from "@/components/shared/ui/Button/types";
import type { SelectionItem } from "@/components/shared/ui/DropDown/types";
import type { DialogOption } from "@/components/shared/ui/DropdownMenu/types";
import { iconsList } from "@/components/shared/ui/Icon/list";
import { InputSize } from "@/components/shared/ui/Input/types";
import type { TextVariant } from "@/components/shared/ui/Text/Base/types";
import { COLORS } from "@/constants/Colors";
import type FontFamily from "@/constants/FontFamily";

export const TEXT_VARIANTS: TextVariant[] = [
  "H0",
  "H1",
  "H2",
  "H3",
  "H4",
  "lg",
  "md",
  "sm",
  "xsm",
];

export const TEXT_COLORS: textColorType[] = [
  "heading",
  "body",
  "caption",
  "primary",
  "success",
  "danger",
  "disabled",
];

export const FONT_WEIGHTS: (keyof typeof FontFamily)[] = [
  "font300",
  "font400",
  "font500",
  "font600",
  "font700",
  "font800",
];

export const ANIMATED_TEXTS = ["Build faster", "Ship with Nova", "Feature based"];

export const BUTTON_VARIANTS: ButtonVariant[] = [
  "primary",
  "outlined",
  "ghost",
  "link",
  "destructive",
];

export const BUTTON_SIZES: ButtonSize[] = ["sm", "md", "lg"];

export const INPUT_SIZES: InputSize[] = [InputSize.sm, InputSize.lg, InputSize.xl];

export const ICON_NAMES = Object.keys(iconsList) as (keyof typeof iconsList)[];

export const ICON_COLORS: iconsColorType[] = [
  "primary",
  "secondary",
  "action",
  "success",
  "danger",
  "disabled",
];

export const CITY_OPTIONS: SelectionItem[] = [
  { label: "Cairo", value: "cairo" },
  { label: "Alexandria", value: "alexandria" },
  { label: "Giza", value: "giza" },
  { label: "Luxor", value: "luxor" },
  { label: "Aswan", value: "aswan" },
];

export const MENU_OPTIONS: DialogOption[] = [
  { label: "Edit", value: "edit", icon: "pencil" },
  { label: "Share", value: "share", icon: "share-social" },
  {
    label: "Delete",
    value: "delete",
    icon: "trash",
    color: COLORS.light.text.danger,
  },
];

export const PROGRESS_STEP = 20;
export const PROGRESS_TOTAL = 100;
export const PASSWORD_MIN_LENGTH = 8;
