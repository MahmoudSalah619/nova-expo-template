/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const COLORS = {
  light: {
    // main colors
    primary: "#0a7ea4",
    secondary: "#7F7F7F",
    grey: "#DEDDE0",
    greyCe:"#CECECE",
    greyE5:"#E5E5E5",
    grey70:"#707070",
    white: "#FFFFFF",
    black: "#000000",

    // app colors
    text: "#11181C",
    background: "#F2F2F2",
    tint: tintColorLight,
    icon: "#687076",
    border: "#C5CCD6",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,

    // system message colors
    success: "#159F91",
    danger: "#FF193B",
    dangerF5: "#F54135",
    dangerBC: "#BC1823",
    dangerFF: "#FFCDD4",
  },
  dark: {
    // main colors
    primary: "#0a7ea4",
    secondary: "#7F7F7F",
    grey: "#DEDDE0",
    greyCe:"#CECECE",
    greyE5:"#E5E5E5",
    grey70:"#707070",
    white: "#FFFFFF",
    black: "#000000",

    // app colors
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    border: "#3E4042",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    
    // system message colors
    success: "#159F91",
    danger: "#FF193B",
    dangerF5: "#F54135",
    dangerBC: "#BC1823",
    dangerFF: "#FFCDD4",
  },
};
