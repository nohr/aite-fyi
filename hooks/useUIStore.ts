import { create } from "zustand";
// import { devtools } from "zustand/middleware";

export const useUIStore = create<UIProps>()(
  //   persist(
  (set, get) => ({
    loading: true,
    setLoading(loading = !get().loading) {
      set(() => ({ loading }));
    },
    path: "/",
    setPath(path: Routes) {
      set(() => ({ path }));
    },
    grab: false,
    setGrab(bool) {
      set(() => ({ grab: bool }));
    },
    motion: true,
    setMotion() {
      set((state: any) => ({ motion: !state.motion }));
    },
    status: "Loading...",
    setStatus(status): void {
      set(() => ({ status }));
    },
    theme: "light",
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
  })
);
