import { create } from "zustand";
import { devtools } from "zustand/middleware";

// let time: NodeJS.Timeout | undefined;
const UIStore = (set: any, get: any): UIProps => ({
  motion: true,
  setMotion() {
    set((state: any) => ({ motion: !state.motion }));
  },
  status: "loading model",
  setStatus(status: UIProps["status"]): void {
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
});

export const useUIStore = create(
  devtools(
    //   persist(
    UIStore,
    {
      name: "ui",
    }
    //   )
  )
);
