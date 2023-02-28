import { create } from "zustand";

export const useWorldStore = create<WorldProps>()((set, get) => ({
  modifier: 36,
  world_height: 0,
  world_width: 0,
  setWorld(world_height, world_width) {
    set(() => ({ world_height, world_width }));
  },

  wrapper_height: 0,
  wrapper_width: 0,
  setWrapper(wrapper_height) {
    set(() => ({
      wrapper_height,
      wrapper_width: wrapper_height * (get().world_width / get().world_height),
    }));
  },
  zoom: false,
  setZoom(zoom = !get().zoom) {
    set(() => ({ zoom }));
  },
  rotate: false,
  setRotate(rotate = !get().rotate) {
    set(() => ({ rotate }));
  },
}));

interface WorldProps {
  modifier: number;
  world_height: number;
  world_width: number;
  setWorld: (world_height: number, world_width: number) => void;
  wrapper_height: number;
  wrapper_width: number;
  setWrapper: (wrapper_height: number) => void;
  zoom: boolean;
  setZoom: (zoom?: boolean) => void;
  rotate: boolean;
  setRotate: (rotate?: boolean) => void;
}
