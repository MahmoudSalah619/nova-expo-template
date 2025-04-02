import { StyleSheet } from "react-native";
import React from "react";

import Home from "./tabs/Home";

import Heart from "./tabs/Heart";

import Camera from "./tabs/Camera";
import Profile from "./tabs/Profile";

const icons = {
  home: Home,
  heart: Heart,
  camera: Camera,
  profile: Profile,
};
const Icon = ({ name, size, color, strokeWidth }) => {
  const IconComponent = icons[name];
  return (
    <IconComponent
      height={size || 24}
      width={size || 24}
      strokeWidth={strokeWidth || 1.9}
      color={color}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({});
