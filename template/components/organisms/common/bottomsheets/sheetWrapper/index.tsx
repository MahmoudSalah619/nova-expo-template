import { View, ViewStyle } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import Text from "@/components/atoms/Text";
import SeperateLine from "@/components/atoms/SeperateLine";
import { SheetWrapperProps } from "./types";
import styles from "./styles";

function SheetWrapper({
  children,
  containerStyle = {},
  sheetHeight = undefined as number | undefined,
  sheetId,
  title = "",
  color = "black",
  weight = 500,
  isNoPadding = false,
  showSeperateLine = true,
}: SheetWrapperProps) {
  const customContainerStyle: ViewStyle = {
    ...styles.container,
    ...containerStyle,
    padding: isNoPadding ? 0 : 16,
    height: typeof sheetHeight === "number" ? sheetHeight : undefined,
  };
  return (
    <ActionSheet
      gestureEnabled
      enableGesturesInScrollView={true}
      // @ts-ignore
      snapPoints={100}
      containerStyle={customContainerStyle}
      id={sheetId}
    >
      <>
        {title && (
          <View style={styles.headerTitleContainer}>
            <Text
              size={20}
              weight={weight || 500}
              style={styles.headerTitle}
              color={color}
            >
              {title}
            </Text>
            {!!showSeperateLine && <SeperateLine />}
          </View>
        )}
        {children}
      </>
    </ActionSheet>
  );
}
export default SheetWrapper;
