import { Howl } from "howler";
import { useEffect, useMemo } from "react";

export const useSound = (soundFile: string) => {
  const sound = useMemo(() => {
    return new Howl({
      src: [soundFile],
    });
  }, [soundFile]); // Only re-create if soundFile changes

  useEffect(() => {
    const handleVisibilityChange = () => {
      document.hidden ? sound.mute(true) : sound.mute(false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [sound]); // sound is now stable, useEffect won't re-run unnecessarily

  return sound;
};
