import { ChangeEventHandler, FormEventHandler } from "react";
import { Song } from "types/Song";
import { create } from "zustand";

interface AudioProps {
  audio: HTMLAudioElement | null;
  volume: number;
  muted: boolean;
  song: Song | null;
  playing: boolean;
  setPlaying: (playing?: boolean) => void;
  playlist: Song[];
  time: number;
  setTime: (value: number) => void;
}

export const useAudioStore = create<AudioProps>()((set, get) => ({
  audio: null,
  volume: 50,
  muted: false,
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
  setTime: (time) => {
    const audio = document.querySelector("audio");
    if (!audio) return;
    if (get().playing) get().setPlaying(false);

    if (time && !Number.isNaN(audio.duration)) {
      const currentTime = (time / 100) * audio.duration;
      audio.currentTime = currentTime;
    }
    set({ time: time / 100 });
    get().setPlaying();
  },
}));
