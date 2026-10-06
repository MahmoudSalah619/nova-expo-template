import { COLORS } from "@/constants/Colors";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";
import { ButtonSize, ButtonVariant, SizeConfig, VariantConfig } from "./types";

export const SIZE_CONFIG: Record<ButtonSize, SizeConfig> = {
  sm: {
    height: Spacing.x9,
    textVariant: "xsm",
  },
  md: {
    height: Spacing.x11,
    textVariant: "sm",
  },
  lg: {
    height: Spacing.x13,
    textVariant: "lg",
  },
};

export const VARIANT_CONFIG: Record<ButtonVariant, VariantConfig> = {
  primary: {
    btnStyle: {
      backgroundColor: COLORS[theme].Surface.action,
      ...getShadow("md", theme, "action"),
    },
    disabledBtnStyle: {
      backgroundColor: COLORS[theme].Surface.actionDisabled,
    },
    textColor: "onAction",
  },
  outlined: {
    btnStyle: {
      borderWidth: 1.5,
      borderColor: COLORS[theme].border.primary,
      backgroundColor: COLORS[theme].Surface.primary,
    },
    disabledBtnStyle: {
      borderWidth: 1.5,
      borderColor: COLORS[theme].border.disabled,
    },
    textColor: "heading",
  },
  ghost: {
    btnStyle: {
      backgroundColor: COLORS[theme].Surface.subtle,
    },
    textColor: "heading",
  },
  link: {
    textColor: "primary",
  },
  destructive: {
    btnStyle: {
      backgroundColor: COLORS[theme].Surface.danger,
    },
    disabledBtnStyle: {
      backgroundColor: COLORS[theme].Surface.actionDisabled,
    },
    textColor: "onAction",
  },
};
