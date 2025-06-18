import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export function useFirstLaunch() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const hasLaunched = await SecureStore.getItemAsync("hasLaunched");
      if (hasLaunched === null) {
        await SecureStore.setItemAsync("hasLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    })();
  }, []);

  return isFirstLaunch;
}
