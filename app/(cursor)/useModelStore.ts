import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";
import { create } from "zustand";
import { ModelProps } from "./model";

export const useModelStore = create<ModelProps>()((set, get) => ({
  resolution: { width: 640, height: 360 },
  camera: null,
  hands: null,
  kill_hands: () => {
    set(() => ({ hands: null, camera: null, results: null }));
  },
  results: null,
  onResults(results) {
    set({ results });
    const canvasCtx = get().canvas?.getContext("2d");

    if (!canvasCtx || !get().canvas) return;
    const canvasElem = get().canvas as HTMLCanvasElement;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElem.width, canvasElem.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElem.width,
      canvasElem.height
    );
    if (!results.multiHandLandmarks) return;
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 5,
      });
      drawLandmarks(canvasCtx, landmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
    }

    canvasCtx.restore();
  },
  selfie: true,
  setSelfie() {
    set((state) => ({ selfie: !state.selfie }));
  },
  input: null,
  get_input(input) {
    set({ input });
  },
  canvas: null,
  get_canvas(canvas) {
    set({ canvas });
  },
  start_input() {
    if (get().input?.srcObject)
      (<MediaStream>get().input?.srcObject).getVideoTracks()[0].enabled = true;
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: get().resolution.width,
          height: get().resolution.height,
          facingMode: `${get().selfie ? "user" : "environment"}`,
        },
      })
      .then((stream) => {
        (<HTMLVideoElement>get().input).srcObject = stream;
        // init hands
        if (get().hands) return;
        set(() => ({
          hands: new Hands({
            locateFile: (file: string) => {
              return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            },
          }),
        }));
        // Set hands options
        get().hands?.setOptions({
          selfieMode: get().selfie,
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.95,
          minTrackingConfidence: 0.95,
        });
        // Use `MediaPipe` utils to get camera - lower resolution = higher fps
        set(() => ({
          camera: new Camera(get().input as HTMLVideoElement, {
            onFrame: async () => {
              await get().hands?.send({
                image: get().input as HTMLVideoElement,
              });
            },
            width: 1280,
            height: 720,
            facingMode: `${get().selfie ? "user" : "environment"}`,
          }),
        }));
        get()
          .camera?.start()
          .catch((err: Error) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  stop_input() {
    (<MediaStream>get().input?.srcObject)?.getVideoTracks()[0].stop();
    get().camera?.stop();
  },
}));
