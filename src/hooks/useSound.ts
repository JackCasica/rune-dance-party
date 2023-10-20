import { Howl } from "howler";
import { useEffect } from "react";

export const useSound = (soundFile: string) => {
  const sound = new Howl({
    src: [soundFile],
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      document.hidden ? sound.pause() : sound.play();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return sound;
};
