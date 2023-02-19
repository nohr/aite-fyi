import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UIProps {
  motion: boolean;
  setMotion: () => void;
  status: string | JSX.Element;
  /**
   * Sets the status message in the menu.
   *
   * @param status The status message which may be a string or JSX.Element.
   */
  setStatus: (status: string | JSX.Element) => void;
  //   theme: "light" | "dark";
  //   setTheme: (theme: "light" | "dark") => void;
}

let time: NodeJS.Timeout | undefined;
const UIStore = (set: any, get: any): UIProps => ({
  motion: true,
  setMotion() {
    set((state: any) => ({ motion: !state.motion }));
  },
  status: "Press space to start",
  setStatus(status: UIProps["status"]): void {
    clearTimeout(time);
    set(() => ({ status }));
    if (status !== "Press space to start")
      time = setTimeout(() => get().setStatus(" "), 3000);
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
