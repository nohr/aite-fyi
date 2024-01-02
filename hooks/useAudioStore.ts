import { ChangeEventHandler, FormEventHandler } from "react";
import { Song } from "types/Song";
import { create } from "zustand";

interface AudioProps {
  audio: HTMLAudioElement | null;
  volume: number;
  setVolume: ChangeEventHandler<HTMLInputElement>;
  muted: boolean;
  setMuted: (muted?: boolean) => void;
  song: Song | null;
  playing: boolean;
  setPlaying: (playing?: boolean) => void;
  playlist: Song[];
  time: number;
  setTime: FormEventHandler<HTMLInputElement>;
}

export const useAudioStore = create<AudioProps>()((set, get) => ({
  audio: null,
  volume: 50,
  setVolume: (e) => set({ volume: Number(e.target.value) }),
  muted: false,
  setMuted: (muted = !get().muted) => set({ muted }),
  song: null,
  playing: false,
  setPlaying: (playing = !get().playing) => {
    set({ playing });
    if (playing) {
      get().audio?.play();
    } else {
      get().audio?.pause();
    }
  },
  playlist: [],
  time: 0,
  setTime: (e) => {
    const audio = document.querySelector("audio");
    if (!audio) return;
    if (get().playing) get().setPlaying(false);
    const time = parseInt(e.currentTarget.value);
    if (time && !Number.isNaN(audio.duration)) {
      const currentTime = (time / 100) * audio.duration;
      audio.currentTime = currentTime;
    }
    set({ time: time / 100 });
    get().setPlaying();
  },
}));
