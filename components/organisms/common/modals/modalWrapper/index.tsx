import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { ModalWrapperProps } from "./types";
import styles from "./styles";
import { COLORS } from "@/constants/Colors";

export default function ModalWrapper({
  isVisible,
  setVisible,
  children,
  containerStyle,
  cannotDismiss,
  height = "auto",
  onDismiss = () => {},
}: ModalWrapperProps) {
  const hideModal = () => {
    if (cannotDismiss) return;
    setVisible(false);
    onDismiss();
  };

  const sizeStyle = { height };

  return (
    <ReactNativeModal
      avoidKeyboard
      isVisible={isVisible}
      onBackdropPress={hideModal}
      onDismiss={onDismiss}
      animationIn={"zoomIn"}
      backdropColor="#000"
      backdropOpacity={0.6}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      {/* <StatusBar backgroundColor="#00000099" /> */}
      <View style={[styles.modalContainer, sizeStyle, containerStyle]}>
        {!cannotDismiss && (
          <View style={[GLOBAL_STYLES.row, styles.closeSection]}>
            <TouchableOpacity onPress={hideModal}>
              <AntDesign name="close" size={18} color={COLORS.light.black} />
            </TouchableOpacity>
          </View>
        )}

        {children}
      </View>
    </ReactNativeModal>
  );
}
