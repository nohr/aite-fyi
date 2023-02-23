import { useUIStore } from "(ui)";
import {
  motion,
  useDragControls,
  useScroll,
  useTransform,
} from "framer-motion";
import { PointerEvent, useEffect } from "react";
import { useWorldStore } from "./useWorldStore";

export function Minimap({
  wrapper,
  screen,
  world,
}: {
  wrapper: React.RefObject<HTMLDivElement>;
  screen: React.RefObject<HTMLDivElement>;
  world: React.RefObject<HTMLDivElement>;
}) {
  const grab = useUIStore((state) => state.grab);
  const setGrab = useUIStore((state) => state.setGrab);
  const modifier = useWorldStore((state) => state.modifier);
  const world_height = useWorldStore((state) => state.world_height);
  const world_width = useWorldStore((state) => state.world_width);
  const wrapper_height = useWorldStore((state) => state.wrapper_height);
  const wrapper_width = useWorldStore((state) => state.wrapper_width);
  const screen_height = useWorldStore((state) => state.screen_height);
  const screen_width = useWorldStore((state) => state.screen_width);

  // console.log(screen_height(), screen_width());

  const dragControls = useDragControls();

  const { scrollX, scrollY } = useScroll();
  const translateY = useTransform(
    scrollY,
    [0, world_height],
    [0, wrapper_height()]
  );
  const translateX = useTransform(
    scrollX,
    [0, world_width],
    [0, wrapper_width()]
  );

  let mx = 0;
  let my = 0;

  return (
    <div
      className={`fixed bottom-4 right-4 isolate z-40 overflow-hidden rounded-md border-[1px] border-current
      bg-white  opacity-0 shadow-md transition-opacity delay-200 hover:opacity-100 dark:bg-black`}
    >
      <motion.div
        ref={wrapper}
        className="relative m-1"
        style={{
          height: wrapper_height(),
          width: wrapper_width(),
        }}
        // onPointerDown={(event: PointerEvent<Element> | PointerEvent) =>
        //   dragControls.start(event, { snapToCursor: true })
        // }
      >
        <motion.div
          drag
          onDrag={(event, info) => {
            setGrab(true);
            // update window scroll position
            if (!screen.current || !world.current) return;
            mx = info.delta.x;
            my = info.delta.y;
            // ! this is the problem: scrolls the minimap
            window.scrollBy({
              left: mx,
              top: my,
            });
          }}
          style={{
            translateY,
            translateX,
          }}
          onDragStart={() => setGrab(true)}
          onDragEnd={() => setGrab(false)}
          dragConstraints={wrapper}
          dragElastic={0.1}
          dragMomentum={false}
          dragControls={dragControls}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          whileHover={{ cursor: "grab" }}
          whileTap={{
            scale: 0.9,
            transformOrigin: "50% 50%",
          }}
          whileDrag={{
            cursor: "grabbing",
            scale: 0.9,
            transformOrigin: "50% 50%",
          }}
          ref={screen}
          className="absolute origin-top-left touch-none rounded-md border-[1px] border-current shadow-md transition-shadow hover:shadow-xl"
        >
          {/* lines */}
          <div className="pointer-events-none absolute bottom-full left-1/2 h-60 w-[1px] bg-current"></div>
          <div className="pointer-events-none absolute top-full left-1/2 h-60 w-[1px] bg-current"></div>
          <div className="pointer-events-none absolute top-1/2 left-full h-[1px] w-96 bg-current"></div>
          <div className="pointer-events-none absolute top-1/2 right-full h-[1px] w-96 bg-current"></div>
        </motion.div>
      </motion.div>
    </div>
  );
}
