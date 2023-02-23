import { create } from "zustand";

export const useCursorStore = create<CursorProps>()((set, get) => ({
  zoom: false,
  setZoom: (bool) => set((state) => ({ zoom: bool ?? !state.zoom })),
  drag: false,
  setDrag: (bool) => set((state) => ({ drag: bool ?? !state.drag })),
  select: false,
  setSelect: (bool) => set((state) => ({ select: bool ?? !state.select })),
  confirm: false,
  setConfirm: (bool) => set((state) => ({ confirm: bool ?? !state.confirm })),
}));
