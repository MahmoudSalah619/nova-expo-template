import { Text } from "@/components/shared/ui";
import { Dialog } from "@/components/shared/vendor/reactICX/Dialog";
import { COLORS } from "@/constants/Colors";
import { View, Pressable, useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import { DialogProps } from "./types";

const DIALOG_HORIZONTAL_MARGIN = 48;

export default function DialogComponent({
  title = "Delete item?",
  description = "This action cannot be undone.",
  icon = "trash-2",
}: DialogProps) {
  const { width } = useWindowDimensions();

  return (
    <Dialog>
      <Dialog.Trigger>
        <View style={styles.trigger}>
          <Feather name={icon} size={22} color={COLORS.light.icon.onAction} />
        </View>
      </Dialog.Trigger>
      <Dialog.Backdrop blurAmount={25} backgroundColor="rgba(0,0,0,0.7)" />
      <Dialog.Content>
        <View style={[styles.content, { width: width - DIALOG_HORIZONTAL_MARGIN }]}>
          <View style={styles.iconCircle}>
            <Feather name={icon} size={28} color={COLORS.light.icon.danger} />
          </View>
          <Text variant="lg" preventDarkModeColor isCentered>
            {title}
          </Text>
          <Text variant="sm" color="body" isCentered>
            {description}
          </Text>
          <View style={styles.actions}>
            <Dialog.Close asChild>
              <Pressable style={[styles.btn, styles.cancelBtn]}>
                <Text variant="sm" preventDarkModeColor>
                  Cancel
                </Text>
              </Pressable>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Pressable style={[styles.btn, styles.deleteBtn]}>
                <Feather name={icon} size={18} color={COLORS.light.icon.onAction} />
                <Text variant="sm" color="onAction">
                  Confirm
                </Text>
              </Pressable>
            </Dialog.Close>
          </View>
        </View>
      </Dialog.Content>
    </Dialog>
  );
}
