import { StyleSheet } from "react-native";
import React from "react";

import Home from "./Home";

import Heart from "./Heart";

import Camera from "./Camera";
import Profile from "./Profile";

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
