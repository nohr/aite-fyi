import { useUIStore } from "(ui)";
import { useEffect, useState } from "react";
import { useModelStore } from "./useModelStore";

export function useCursor() {
  const input = useModelStore((state) => state.input);
  const start_input = useModelStore((state) => state.start_input);
  const stop_input = useModelStore((state) => state.stop_input);
  const onResults = useModelStore((state) => state.onResults);
  const setStatus = useUIStore((state) => state.setStatus);
  const hands = useModelStore((state) => state.hands);
  const motion = useUIStore((state) => state.motion);
  const results = useModelStore((state) => state.results);
  const [cursor, setCursor] = useState(false);

  // Handle the model functions
  useEffect(() => {
    if (!motion && input) stop_input();
    if (!motion && hands) return;
    setStatus("loading model");
    start_input();

    if (!hands) return;
    hands.onResults(onResults);
  }, [hands, input, motion, onResults, setStatus, start_input, stop_input]);

  useEffect(() => {
    if (!results) return;
    setStatus("");
  }, [results, setStatus]);

  // handle cursor hide/show
  useEffect(() => {
    if (cursor) document.body.style.cursor = "none";
    else document.body.style.cursor = "auto";
  }, [cursor]);

  return { cursor, setCursor, results };
}
