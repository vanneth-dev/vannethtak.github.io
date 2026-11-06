import { useCallback, useEffect, useState } from "react";

/** Toggle document fullscreen and track whether it is currently active. */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(
    () => typeof document !== "undefined" && !!document.fullscreenElement,
  );
  const supported =
    typeof document !== "undefined" &&
    !!document.documentElement.requestFullscreen;

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Ignore: the browser may block fullscreen (e.g. no user gesture).
    }
  }, []);

  return { isFullscreen, supported, toggle };
}
