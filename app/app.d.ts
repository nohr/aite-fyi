// zustand state props
interface ModelProps {
  resolution: { width: number; height: number };
  /**
   * The camera instance.
   * @type {Camera}
   * @see https://google.github.io/mediapipe/solutions/camera_utils#javascript-solution-api
   *
   *
   */
  camera: Camera;
  /**
   * The Hands model instance.
   * @type {Hands}
   * @see https://google.github.io/mediapipe/solutions/hands#javascript-solution-api
   *
   */
  hands: Hands | undefined;
  /**
   * Kills the hands model.
   * @type {() => void}
   */
  kill_hands: () => void;
  /**
   * The hand model results instance.
   * @type {Results}
   * @see {@link @mediapipe/hands/index.d.ts}
   */
  results: Results | null;
  onResults: (results: Results) => void;
  selfie: boolean;
  setSelfie: () => void;
  input: HTMLVideoElement | null;
  get_input: (input: HTMLVideoElement) => void;
  canvas: HTMLCanvasElement | null;
  get_canvas: (canvas: HTMLCanvasElement) => void;
  start_input: () => void;
  stop_input: () => void;
  stage?: number;
}

interface UIProps {
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
