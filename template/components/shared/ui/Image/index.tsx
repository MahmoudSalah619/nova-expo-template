import { Image as RNImage, StyleSheet, View, ViewStyle } from "react-native";
import { useState } from "react";
import { ImgProps } from "./types";
import LoadingComponent from "../Loading";
import styles from "./styles";

function Image({ containerStyle, style, ...otherProps }: ImgProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={containerStyle}>
      <RNImage
        onLoad={() => {
          setIsLoading(false);
        }}
        style={style}
        {...otherProps}
      />
      {isLoading && (
        <View
          style={StyleSheet.flatten([
            styles.loadingFullContainer,
            style as ViewStyle,
          ])}
        >
          <LoadingComponent />
        </View>
      )}
    </View>
  );
}

export default Image;
