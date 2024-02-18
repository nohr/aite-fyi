import useSound from "use-sound";
import { useAudioStore } from "./useAudioStore";

function useSFX(src: string, volume = 0.25) {
  const muted = useAudioStore((s) => s.muted);
  const [play] = useSound(src, {
    volume,
    interrupt: true,
    soundEnabled: !muted,
  });

  return [play];
}

export default useSFX;
