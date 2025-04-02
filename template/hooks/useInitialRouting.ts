import { useEffect, useState } from "react";

const useInitialRouting = () => {
  const [targetPath, setTargetPath] = useState<string | null>(null);

  const determineRoute = async () => {
    const isSignedIn = await fakeAuthCheck(); // Your auth logic
    setTargetPath(isSignedIn ? "/(main)/home" : "/(auth)/welcome");
  };

  useEffect(() => {
    determineRoute();
  }, []);

  return { targetPath };
};

// Simulate an async authentication check
const fakeAuthCheck = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(false), 2000)); // Change to `true` for testing signed-in state
};

export default useInitialRouting;
