import { FadeInDown, FadeOutDown, FadeInUp, FadeOutUp, ZoomIn, ZoomOut, BounceIn, BounceOut } from "react-native-reanimated";

export const ANIMATION_VARIATIONS = {
  fadeSlideDown: {
    entering: FadeInDown.duration(200),
    exiting: FadeOutDown.duration(200),
  },
  fadeSlideUp: {
    entering: FadeInUp.duration(200),
    exiting: FadeOutUp.duration(200),
  },
  scale: {
    entering: ZoomIn.duration(200),
    exiting: ZoomOut.duration(200),
  },
  bounce: {
    entering: BounceIn.duration(300),
    exiting: BounceOut.duration(300),
  },
};
