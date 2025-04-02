import React from "react";
import { useColorScheme } from "react-native";
import NovaBlack from "@/assets/images/nova-black.png";
import NovaWhite from "@/assets/images/nova-white.png";
import Image from "../Image";

export default function Logo({ width = 120, height = 90 }) {
  const colorScheme = useColorScheme() ?? "light";
  const themedLogo = colorScheme === "light" ? NovaBlack : NovaWhite;
  return (
    <Image
      source={themedLogo}
      style={{ alignSelf: "center", width: width, height: height }}
    />
  );
}
