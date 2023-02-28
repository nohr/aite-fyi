import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useUIStore = create<UIProps>()(
  devtools(
    //   persist(
    (set, get) => ({
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
        // clearTimeout(time);
        // console.log(status);

        set(() => ({ status }));
        // if (status !== "Press space to start")
        //   time = setTimeout(() => get().setStatus(" "), 3000);
      },
      //   theme:
      //     window?.matchMedia &&
      //     window?.matchMedia("(prefers-color-scheme: dark)").matches
      //       ? "dark"
      //       : "light",
      //   setTheme(theme: UIProps["theme"]) {
      //     set(() => ({ theme }));
      //   },
      routing: false,
      setRouting(routing = !get().routing) {
        set(() => ({ routing }));
      },
      fade: false,
      setFade(fade = !get().fade) {
        set(() => ({ fade }));
      },
    }),
    {
      name: "ui",
    }
    //   )
  )
);
