import { Slot, SplashScreen, router } from "expo-router";
import { useFirstLaunch } from "@/hooks/useFirstLaunch";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isFirstLaunch = useFirstLaunch();

  useEffect(() => {
    if (isFirstLaunch === false) {
      SplashScreen.hideAsync();
    }
    if (isFirstLaunch === true) {
      router.replace("/auth/signup"); 
      SplashScreen.hideAsync();
    }
  }, [isFirstLaunch]);

  if (isFirstLaunch === null) {
    return null; 
  }

  return <Slot />;
}
