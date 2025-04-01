import { StyleSheet } from "react-native";
import { useEffect } from "react";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import FB_ICON from "@/assets/images/fb-icon.png";
import Button from "@/components/atoms/Button";
import { useFacebookLoginMutation } from "@/apis/services/auth";
import loginHandler from "@/utils/loginHandler";
import showSuccessMsg from "@/utils/showSuccessMsg";
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

const FACEBOOK_CLENT_ID = "723166616477711";
WebBrowser.maybeCompleteAuthSession();

export default function FacebookRegisterationButton() {
  const [facebookLogin, { isLoading: isFacebookLoginLoading }] =
    useFacebookLoginMutation();

  const [, response, promptAsync] = Facebook.useAuthRequest({
    // expoClientId: FACEBOOK_CLENT_ID,
    clientId: FACEBOOK_CLENT_ID,
    responseType: ResponseType.Token,
    scopes: ["email"],
  });

  const facebookRegister = () => {
    promptAsync();
  };

  useEffect(() => {
    if (!response) return;

    if (response.type === "success") {
      const facebookToken = response.authentication?.accessToken;
      facebookLogin({ access_token: facebookToken })
        .unwrap()
        .then((res) => {
          loginHandler({
            token: res?.access_token,
            refreshToken: res?.refresh_token,
          });
          showSuccessMsg({ i18nKey: "LOGIN_SUCCESSFULLY" });
        });
    }
  }, [response]);

  const SocialLogoMarkup = <Img source={FB_ICON} style={styles.icon} />;

  return (
    <Button
      title="FACEBOOK"
      variant="outlined"
      onPress={facebookRegister}
      isLoading={isFacebookLoginLoading}
      borderColor={COLORS.light.black}
      color={COLORS.light.black}
      backgroundColor={COLORS.light.white}
      prefix={SocialLogoMarkup}
      btnHeight={52}
    />
  );
}
