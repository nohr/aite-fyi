import { ChangeEventHandler, ReactEventHandler } from "react";
import { create } from "zustand";

interface AudioProps {
  audio: HTMLAudioElement | null;
  setAudio: (audio: HTMLAudioElement) => void;
  volume: number;
  setVolume: ChangeEventHandler<HTMLInputElement>;
  muted: boolean;
  setMuted: (muted?: boolean) => void;
  song: Song | null;
  setSong: (song: Song) => void;
  playing: boolean;
  setPlaying: (playing?: boolean) => void;
  playlist: Song[];
  setPlaylist: (playlist: Song[]) => void;
  time: number;
  setTime: ReactEventHandler<HTMLAudioElement>;
  changeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useAudioStore = create<AudioProps>()((set, get) => ({
  audio: null,
  setAudio: (audio: HTMLAudioElement) => set({ audio }),
  volume: 50,
  setVolume: (e) => set({ volume: Number(e.target.value) }),
  muted: false,
  setMuted: (muted = !get().muted) => set({ muted }),
  song: null,
  setSong: (song: Song) => set({ song }),
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
  setPlaylist: (playlist: Song[]) => set({ playlist }),
  time: 0,
  setTime: (e) => {
    const { duration, currentTime } = e.currentTarget;
    const time = (currentTime / duration) * 100;
    
    set({ time: time || 0 });
  },
  changeTime: (e) => {
    const { duration } = get().audio ?? { duration: 0 };
    const time = Number(e.target.value);
    const audio = get().audio ?? { currentTime: 0 };
    audio.currentTime = (time / 100) * duration;
    set({ time });
  },
}));
