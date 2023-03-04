// zustand state props

interface UIProps {
  path: routes;
  setPath: (path: routes) => void;
  grab: boolean;
  /**
   * Toggles the grab state from minimap scrolling.
   * @type {() => void}
   * */
  setGrab: (grab: boolean) => void;
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
  routing: boolean;
  setRouting: (routing?: boolean) => void;
  fade: boolean;
  setFade: (fade?: boolean) => void;
}

interface CursorProps {
  zoom: boolean;
  setZoom: (bool?: boolean) => void;
  drag: boolean;
  /**
   * Toggles the drag state from physical pointing gesture.
   * @type {() => void}
   * */
  setDrag: (bool?: boolean) => void;
  select: boolean;
  setSelect: (bool?: boolean) => void;
  confirm: boolean;
  setConfirm: (bool?: boolean) => void;
}

// cursor props
type HandProps = {
  hand: { x: number; y: number; z: number }[];
  side: string;
};

type alt = "AltLeft" | "AltRight";

type routes =
  | "/"
  | "/home"
  | "/about"
  | "/contact"
  | "/professional"
  | "/personal"
  | "/resume";

interface ProjectProps {
  title: string;
  description: string;
  desktop: string;
  mobile: string;
  github?: string;
  url?: string;
  program: string[];
}
