import * as Font from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

import IcoMoon from "@/assets/icomoon/icomoon.ttf";
import font300 from "@/assets/fonts/Gotham-Light.otf";
import font400 from "@/assets/fonts/Cairo-Regular.ttf";
import font500 from "@/assets/fonts/Gotham-Medium.otf";
import font600 from "@/assets/fonts/Gotham-Book.otf";
import font700 from "@/assets/fonts/Gotham-Bold.otf";
import font800 from "@/assets/fonts/Gotham-Black.otf";

SplashScreen.preventAutoHideAsync();

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const [loaded] = Font.useFonts({
    IcoMoon,
    font300,
    font400,
    font500,
    font600,
    font700,
    font800,
  });

  const loadResourcesAndDataAsync = () => {
    SplashScreen.hideAsync();
    setLoadingComplete(true);
  };

  useEffect(() => {
    if (!loaded) return;

    loadResourcesAndDataAsync();
  }, [loaded]);

  return isLoadingComplete;
}
