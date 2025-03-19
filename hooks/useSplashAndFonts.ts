import { useEffect, useState } from "react";
import { SplashScreen } from "expo-router";
import * as Font from "expo-font";

const useSplashAndFonts = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Load fonts or other resources here
        await Font.loadAsync({
          // Example font loading
          SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    loadResources();
  }, []);

  return { isReady };
};

export default useSplashAndFonts;
