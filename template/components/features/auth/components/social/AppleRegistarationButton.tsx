import * as AppleAuthentication from "expo-apple-authentication";
import { Platform, StyleSheet } from "react-native";
import { useAppleLoginMutation } from "@/apis/services/auth";
import Button from "@/components/shared/ui/Button";
import loginHandler from "@/utils/loginHandler";
import showSuccessMsg from "@/utils/showSuccessMsg";
import HandleErrors from "@/utils/handleErrors";
import { COLORS } from "@/constants/Colors";

const styles = StyleSheet.create({
  appleRealButton: {
    height: 56,
    width: "100%",
  },
  appleTempButton: {
    alignItems: "center",
    backgroundColor: COLORS.light.Surface.black,
    borderWidth: 0,
    height: 56,
    paddingVertical: 0,
  },
});

export default function AppleRegistarationButton() {
  const [appleLogin, { isLoading: isAppleLoginLoading }] =
    useAppleLoginMutation();

  const loading = isAppleLoginLoading;

  // Sign in with Apple is iOS-only; the native button warns on other platforms.
  if (Platform.OS !== "ios") return null;

  return !loading ? (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={
        AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
      }
      cornerRadius={10}
      style={styles.appleRealButton}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });

          appleLogin({
            access_token: credential?.authorizationCode,
            id_token: credential?.identityToken,
          })
            .unwrap()
            .then((res) => {
              loginHandler({
                token: res?.access_token,
                refreshToken: res?.refresh_token,
              });
              showSuccessMsg({ msg: "LOGIN_SUCCESSFULLY" });
            })
            .catch((err) => HandleErrors(err));
        } catch (e) {
          console.log(e);
        }
      }}
    />
  ) : (
    <Button
      isLoading={loading}
      variant="outlined"
      containerStyle={styles.appleTempButton}
      onPress={() => {}}
    />
  );
}
