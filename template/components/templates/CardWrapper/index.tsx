import { View } from "react-native";
import { CardWrapperProps } from "./types";
import styles from "./styles";

export default function CardWrapper({ children ,customStyles}: CardWrapperProps) {
  return <View style={[styles.container,customStyles]}>{children}</View>;
}
