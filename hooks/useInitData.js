import { useState, useEffect } from "react";

export function useInitData() {
  const [initData, setInitData] = useState("");

  useEffect(() => {
    const data =
      typeof window !== "undefined"
        ? window.Telegram?.WebApp?.initData || ""
        : "";
    setInitData(data);
  }, []);

  return initData;
}
