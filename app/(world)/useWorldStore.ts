import { create } from "zustand";

export const useWorldStore = create<WorldProps>()((set, get) => ({
  modifier: 16,
  world_height: 0,
  world_width: 0,
  setWorld(world_height, world_width) {
    set(() => ({ world_height, world_width }));
  },
  wrapper_height: () => get().world_height / get().modifier,
  wrapper_width: () => get().world_width / get().modifier,
  screen_height: 0,
  screen_width: 0,
  setScreen(screen_height, screen_width) {
    set(() => ({ screen_height, screen_width }));
  },
  zoom: false,
  setZoom(zoom) {
    set(() => ({ zoom }));
  },
  rotate: false,
  setRotate(rotate) {
    set(() => ({ rotate }));
  },
}));

interface WorldProps {
  modifier: number;
  world_height: number;
  world_width: number;
  setWorld: (world_height: number, world_width: number) => void;
  wrapper_height: () => number;
  wrapper_width: () => number;
  screen_height: number;
  screen_width: number;
  setScreen: (screen_height: number, screen_width: number) => void;
  zoom: boolean;
  setZoom: (zoom?: boolean) => void;
  rotate: boolean;
  setRotate: (rotate?: boolean) => void;
}
