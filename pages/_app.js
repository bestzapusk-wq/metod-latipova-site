import { useEffect } from "react";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const tg = typeof window !== "undefined" && window.Telegram?.WebApp;
    if (!tg) return;

    tg.ready();
    tg.expand();

    const safeTop = tg.safeAreaInset?.top ?? 0;
    const contentSafeTop = tg.contentSafeAreaInset?.top ?? 0;
    document.documentElement.style.setProperty(
      "--tg-safe-area-inset-top",
      `${safeTop}px`
    );
    document.documentElement.style.setProperty(
      "--tg-content-safe-area-inset-top",
      `${contentSafeTop}px`
    );

    if (typeof tg.setHeaderColor === "function") {
      tg.setHeaderColor("#ffffff");
    }

    if (typeof tg.setBackgroundColor === "function") {
      tg.setBackgroundColor("#ffffff");
    }

    tg.disableVerticalSwipes?.();
  }, []);

  return <Component {...pageProps} />;
}
