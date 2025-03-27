import { StyleSheet } from "react-native";
import { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";

import * as WebBrowser from "expo-web-browser";
import GOOGLE_ICON from "@/assets/images/google-logo.png";
import Button from "@/components/atoms/Button";
import { useGoogleLoginMutation } from "@/apis/services/auth";
import showSuccessMsg from "@/utils/showSuccessMsg";
import loginHandler from "@/utils/loginHandler";
import Img from "@/components/atoms/Image";
import { COLORS } from "@/constants/Colors";

const styles = StyleSheet.create({
  icon: {
    borderRadius: 30 / 2,
    height: 30,
    width: 30,
    objectFit: "contain",
  },
});

const DEV_ANDROID_CLIENT_ID =
  "618695051407-p1n9uaf05c0bur7lc5n22kqodb7naelu.apps.googleusercontent.com";
const IOS_CLIENT_ID =
  "618695051407-p1n9uaf05c0bur7lc5n22kqodb7naelu.apps.googleusercontent.com";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleRegisterationButton() {
  const [googleLogin, { isLoading: isGoogleLoginLoading }] =
    useGoogleLoginMutation();

  const [, fullResult, promptAsync] = Google.useAuthRequest({
    // expoClientId: DEV_ANDROID_CLIENT_ID,
    androidClientId: DEV_ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ["email"],
  });

  const googleRegisteration = async () => {
    await promptAsync();
  };

  useEffect(() => {
    if (!fullResult) return;

    if (fullResult.type === "success") {
      const googleToken = fullResult.authentication?.accessToken;
      googleLogin({ access_token: googleToken })
        .unwrap()
        .then((res) => {
          loginHandler({
            token: res?.access_token,
            refreshToken: res?.refresh_token,
          });
          showSuccessMsg({ i18nKey: "LOGIN_SUCCESSFULLY" });
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullResult]);

  const SocialLogoMarkup = <Img source={GOOGLE_ICON} style={styles.icon} />;

  return (
    <Button
      title="GOOGLE"
      variant="outlined"
      onPress={googleRegisteration}
      isLoading={isGoogleLoginLoading}
      borderColor={COLORS.light.black}
      backgroundColor={COLORS.light.white}
      prefix={SocialLogoMarkup}
      color={COLORS.light.black}
      btnHeight={52}
    />
  );
}
