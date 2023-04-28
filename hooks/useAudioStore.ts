import { create } from "zustand";

interface AudioProps {
  volume: number;
}

export const useAudioStore = create<AudioProps>()((set, get) => ({
  volume: 50,
}));
