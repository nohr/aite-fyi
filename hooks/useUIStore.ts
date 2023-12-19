import { Project } from "types/Project";
import { create } from "zustand";
// import { devtools } from "zustand/middleware";
interface UIProps {
  project: Project | null;
  AIControl: boolean;
  setAIControl: (AIControl?: boolean) => void;
  loading: boolean;
  setLoading: (loading?: boolean) => void;
  status: string | JSX.Element;
  /**
   * Sets the status message in the menu.
   *
   * @param status The status message which may be a string or JSX.Element.
   */
  setStatus: (status: string | JSX.Element) => void;
  navLeft: boolean;
  setNavLeft: (navLeft?: boolean) => void;
  color: string | undefined;
  theme: "light" | "dark" | undefined;
  setTheme: (theme: "light" | "dark") => void;
  routing: boolean;
  setRouting: (routing?: boolean) => void;
  fade: boolean;
  setFade: (fade?: boolean) => void;
}

export const useUIStore = create<UIProps>()(
  //   persist(
  (set, get) => ({
    project: null,
    AIControl: false,
    setAIControl(AIControl = !get().AIControl) {
      set(() => ({ AIControl }));
    },
    loading: true,
    setLoading(loading = !get().loading) {
      set(() => ({ loading }));
    },
    status: "Loading...",
    setStatus(status): void {
      set(() => ({ status }));
    },
    navLeft: true,
    setNavLeft(navLeft = !get().navLeft) {
      set(() => ({ navLeft }));
    },
    color: undefined,
    theme: undefined,
    setTheme(theme: "light" | "dark") {
      set(() => ({ theme }));
    },
    routing: false,
    setRouting(routing = !get().routing) {
      set(() => ({ routing }));
    },
    fade: false,
    setFade(fade = !get().fade) {
      set(() => ({ fade }));
    },
  }),
);
