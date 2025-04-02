import { useEffect, useState } from "react";
import { SplashScreen } from "expo-router";
import * as Font from "expo-font";
import cosmica_300 from "@/assets/fonts/Cosmica-Light.otf";
import cosmica_400 from "@/assets/fonts/Cosmica-Regular.otf";
import cosmica_500 from "@/assets/fonts/Cosmica-Medium.otf";
import cosmica_600 from "@/assets/fonts/Cosmica-SemiBold.otf";
import cosmica_700 from "@/assets/fonts/Cosmica-Bold.otf";
import cosmica_800 from "@/assets/fonts/Cosmica-ExtraBold.otf";

const UseLoadResources = () => {
  useEffect(() => {
    const loadResources = async () => {
      try {
        // Load fonts or other resources here
        await Font.loadAsync({
          cosmica_300,
          cosmica_400,
          cosmica_500,
          cosmica_600,
          cosmica_700,
          cosmica_800,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    loadResources();
  }, []);
};

export default UseLoadResources;
