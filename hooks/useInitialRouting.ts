import { useEffect, useState } from "react";
import { Redirect, useRouter } from "expo-router";

const useInitialRouting = (isReady: boolean) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false); // Replace with your auth logic

  useEffect(() => {
    if (isReady) {
      const checkAuth = async () => {
        // Replace this with your actual authentication logic
        const userSignedIn = (await fakeAuthCheck()) as boolean;
        setIsSignedIn(userSignedIn);
        setIsLoading(false);
      };

      checkAuth();
    }
  }, [isReady]);

  useEffect(() => {
    if (!isLoading && isReady) {
      if (isSignedIn) {
        router.replace("/(main)/(tabs)/home"); // Redirect to home screen
      } else {
        router.replace("/(auth)/welcome"); // Redirect to welcome screen
      }
    }
  }, [isLoading, isSignedIn, isReady, router]);

  return { isLoading };
};

// Simulate an async authentication check
const fakeAuthCheck = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(true), 2000)); // Change to `true` for testing signed-in state
};

export default useInitialRouting;
