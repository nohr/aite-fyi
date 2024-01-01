import useSound from "use-sound";
import { useAudioStore } from "./useAudioStore";

function useSFX(src: string) {
  const muted = useAudioStore((s) => s.muted);
  const [play] = useSound(src, {
    volume: 0.25,
    interrupt: true,
    soundEnabled: !muted,
  });

  return [play];
}

export default useSFX;
