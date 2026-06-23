import { useState, useEffect } from "react";

export function useTelegramUser() {
  const [user, setUser] = useState(null);
  const [tg, setTg] = useState(null);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const webApp =
      typeof window !== "undefined" && window.Telegram?.WebApp;
    if (webApp) {
      setTg(webApp);
      setIsTelegram(true);
      setUser(webApp.initDataUnsafe?.user || null);
    }
  }, []);

  return { user, tg, isTelegram };
}
