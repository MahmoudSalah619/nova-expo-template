import { ImageProps, ViewStyle, ImageStyle, StyleProp } from "react-native";

export interface ImgProps extends ImageProps {
  containerStyle?: ViewStyle;
  style?: StyleProp<ImageStyle>;
}
