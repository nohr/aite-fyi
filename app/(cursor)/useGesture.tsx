import { useEffect, useRef } from "react";
import { useCursorStore } from "./useCursorStore";
import { useModelStore } from "./useModelStore";

export function useGesture(cursor: boolean) {
  const results = useModelStore((state) => state.results);
  const select = useRef(false);
  // const confirm = useRef(false);
  const drag = useCursorStore((state) => state.drag);
  const setDrag = useCursorStore((state) => state.setDrag);
  const zoom = useRef(false);
  const distx = useRef(0);
  const disty = useRef(0);
  const threshold = {
    pinch: 0.05,
    drag: 0.07,
    point: 0.35,
    depth: -0.08,
    zoom_max: 0.65,
    zoom_min: 0.3,
  };

  // * zoom gesture - for zooming
  useEffect(() => {
    if (!results || !results.multiHandLandmarks[0] || !cursor) return;

    // ! first check for two hands
    if (results.multiHandLandmarks[1]) {
      const { "8": index_tip_1 } = results.multiHandLandmarks[0];
      const { "8": index_tip_2 } = results.multiHandLandmarks[1];
      if (!index_tip_1 || !index_tip_2) return;

      const distance = Math.sqrt(
        Math.pow(index_tip_1.x - index_tip_2.x, 2) +
          Math.pow(index_tip_1.y - index_tip_2.y, 2)
      );

      // map distance value to a range of 0 to 1
      // console.log(distance);

      // zoom if the distance is less than the threshold
      if (
        distance <= threshold.zoom_max &&
        distance >= threshold.zoom_min &&
        index_tip_1.z < threshold.depth &&
        index_tip_2.z < threshold.depth
      ) {
        const mapped = Math.fround(Math.min(Math.max(distance, 0), 1)) * 2;
        //  prepare for zooming out
        zoom.current = true;
        const array = document.querySelector("div#world") as HTMLElement;
        if (!array) return;
        array.style.scale = `${mapped}`;
      } else zoom.current = false;
    }
  }, [
    cursor,
    results,
    threshold.depth,
    threshold.zoom_max,
    threshold.zoom_min,
  ]);

  useEffect(() => {
    if (
      !results ||
      !results.multiHandLandmarks[0] ||
      results.multiHandLandmarks[1] ||
      !cursor
    )
      return;

    // ! only one hand is detected
    // ? get the tips of the other fingers
    const {
      "4": thumb_tip,
      "8": index_tip,
      "12": middle_tip,
      "16": ring_tip,
      "20": pinky_tip,
    } = results.multiHandLandmarks[0];
    if (!index_tip || !thumb_tip || !middle_tip || !ring_tip || !pinky_tip)
      return;

    // * pinch gesture - for selection
    const distance = Math.sqrt(
      Math.pow(index_tip.x - thumb_tip.x, 2) +
        Math.pow(index_tip.y - thumb_tip.y, 2)
    );
    // select if pinched and reset if released
    if (distance < threshold.pinch) select.current = true;
    else select.current = false;

    // todo handle pinch pull to confirm

    // * drag gesture - for navigation
    // get the distance between the index tip and the middle finger tip
    const index_distance = Math.sqrt(
      Math.pow(index_tip.x - middle_tip.x, 2) +
        Math.pow(index_tip.y - middle_tip.y, 2)
    );

    // get the distance between the index tip and the thumb tip
    const thumb_distance = Math.sqrt(
      Math.pow(index_tip.x - thumb_tip.x, 2) +
        Math.pow(index_tip.y - thumb_tip.y, 2)
    );

    //  drag if pointed and reset if released
    if (
      index_distance > threshold.point &&
      thumb_distance > 0.2 &&
      index_tip.z < threshold.depth
    )
      setDrag(true);
    else setDrag(false);

    // Handle release
    if (!drag) {
      // console.log("release");
      distx.current = 0;
      disty.current = 0;
      return;
    }

    // the position of the tip relative to the page at any given time
    const startX = Math.floor(window.scrollX + window.innerWidth * index_tip.x);
    const startY = Math.floor(
      window.scrollY + window.innerHeight * index_tip.y
    );

    if (distx.current === 0) {
      distx.current = startX;
      return;
    }
    if (disty.current === 0) {
      disty.current = startY;
      return;
    }

    const scrollX = distx.current - startX;
    const scrollY = disty.current - startY;

    // todo debounce the scroll coordinates to prevent jittering
    // todo add a threshold to prevent scrolling when the hand is not moving
    // ? return the same value if the distance is less than the threshold

    // console.log(distx.current, disty.current);

    const scroll = () =>
      window.scrollBy({
        left: scrollX * 1.5,
        top: scrollY * 1.5,
      });
    // const debounce = (func: any, wait: number) => {

    scroll();
  }, [results, threshold.point, threshold.pinch, threshold.depth, cursor]);

  return { select, drag, zoom };
}
