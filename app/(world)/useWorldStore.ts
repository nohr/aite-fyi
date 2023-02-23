import { create } from "zustand";

export const useWorldStore = create<WorldProps>()((set, get) => ({
  modifier: 16,
  world_height: 0,
  world_width: 0,
  setWorld(world_height, world_width) {
    set(() => ({ world_height, world_width }));
  },
  setWorldScale(world_scale) {
    set(() => ({ world_scale }));
  },
  world_depth: 0,
  world_scale: 1,
  wrapper_height: () => get().world_height / get().modifier,
  wrapper_width: () => get().world_width / get().modifier,
  wrapper_depth: 0,
  wrapper_scale: 0,
  screen_height: () => (window.innerHeight / get().wrapper_height()) * 100,
  screen_width: () => (window.innerWidth / get().wrapper_width()) * 100,
  screen_depth: 0,
  screen_scale: 0,
}));

interface WorldProps {
  modifier: number;
  world_height: number;
  world_width: number;
  world_depth: number;
  world_scale: number;
  setWorld: (world_height: number, world_width: number) => void;
  setWorldScale: (world_scale: number) => void;
  wrapper_height: () => number;
  wrapper_width: () => number;
  wrapper_depth: number;
  wrapper_scale: number;
  screen_height: () => number;
  screen_width: () => number;
  screen_depth: number;
  screen_scale: number;
}
