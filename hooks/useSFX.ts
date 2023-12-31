import React from "react";
import useSound from "use-sound";

function useSFX(src: string) {
  const [play] = useSound(src, { volume: 0.25, interrupt: true });

  return [play];
}

export default useSFX;
