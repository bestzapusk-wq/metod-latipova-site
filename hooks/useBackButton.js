import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

export function useBackButton(show = true, href = null) {
  const router = useRouter();
  const hrefRef = useRef(href);
  hrefRef.current = href;

  const routerRef = useRef(router);
  routerRef.current = router;

  const handlerRef = useRef(function backButtonHandler() {
    const target = hrefRef.current;
    if (target) {
      routerRef.current.push(target);
    } else {
      routerRef.current.back();
    }
  });

  useEffect(() => {
    const backButton =
      typeof window !== "undefined" && window.Telegram?.WebApp?.BackButton;
    if (!backButton) return;

    const handler = handlerRef.current;

    if (show) {
      backButton.show();
      backButton.onClick(handler);
    } else {
      backButton.hide();
    }

    return () => {
      if (show) {
        backButton.offClick(handler);
        backButton.hide();
      }
    };
  }, [show]);
}
