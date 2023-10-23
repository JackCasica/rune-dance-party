import { Howl } from "howler";
import { useEffect } from "react";

import backgroundMusic from "../assets/background-music.mp3";

const backgroundMusicAudio = new Howl({
  src: [backgroundMusic],
});

export const useBackgroundMusic = () => {
  useEffect(() => {
    const playMusicOnce = () => {
      backgroundMusicAudio.play();
      window.removeEventListener("touchstart", playMusicOnce);
    };

    const handleVisibilityChange = () => {
      document.hidden
        ? backgroundMusicAudio.pause()
        : backgroundMusicAudio.play();
    };

    window.addEventListener("touchstart", playMusicOnce);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("touchstart", playMusicOnce);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return backgroundMusicAudio;
};
