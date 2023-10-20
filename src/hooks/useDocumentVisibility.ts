import { useEffect, useState } from "react";

export const useDocumentVisibility = () => {
  const [documentVisibility, setDocumentVisibility] = useState<boolean>();

  useEffect(() => {
    const debounce = (fn: () => void, delay: number) => {
      let timeoutId: number;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(fn, delay);
      };
    };

    const handleVisibilityChange = debounce(() => {
      document.visibilityState === "visible"
        ? setDocumentVisibility(true)
        : setDocumentVisibility(false);
    }, 1000);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return documentVisibility;
};
