import { RefObject } from "react";
import { View } from "react-native";
import { DropdownPosition } from "./types";

export const measureButtonPosition = ({
  ref,
  callback,
  xExtraOffset = 0,
  yExtraOffset = 0,
}: {
  ref: RefObject<View | null>;
  callback: (position: DropdownPosition) => void;
  xExtraOffset?: number;
  yExtraOffset?: number;
}) => {
  if (!ref.current) return;

  ref.current.measure((x, y, width, height, pageX, pageY) => {
    const topPosition = pageY + height + yExtraOffset;

    // Calculate left position ensuring it stays within screen bounds
    const leftPosition = pageX + xExtraOffset;

    callback({
      top: topPosition,
      start: leftPosition,
      width,
    });
  });
};
