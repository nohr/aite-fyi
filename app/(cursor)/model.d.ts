import { Camera } from "@mediapipe/camera_utils";
import { Hands } from "@mediapipe/hands";

interface ModelProps {
  resolution: { width: number; height: number };
  /**
   * The camera instance.
   * @type {Camera}
   * @see https://google.github.io/mediapipe/solutions/camera_utils#javascript-solution-api
   *
   *
   */
  camera: Camera | null;
  /**
   * The Hands model instance.
   * @type {Hands}
   * @see https://google.github.io/mediapipe/solutions/hands#javascript-solution-api
   *
   */
  hands: Hands | null;
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
