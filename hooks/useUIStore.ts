import { Project } from "types/Project";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface UIProps {
  project: Project | null;
  loading: boolean;
  zoom: number;
  camera: { min: number; max: number };
  columns: number;
  color: string | undefined;
  navHeight: number;
  theme: "light" | "dark" | undefined;
  setTheme: (theme: "light" | "dark") => void;
}

export const useUIStore = create<UIProps>()(
  devtools((set, get) => ({
    project: null,
    loading: true,
    zoom: 5,
    camera: { min: 2, max: 12 },
    columns: 1,
    color: undefined,
    navHeight: 80,
    theme: undefined,
    setTheme(theme: "light" | "dark") {
      set(() => ({ theme }));
    },
  })),
);
