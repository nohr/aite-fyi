import { useUIStore } from "(ui)";
import {
  motion,
  MotionValue,
  useDragControls,
  useScroll,
  useTransform,
  useWillChange,
} from "framer-motion";
import { useWorldStore } from "./useWorldStore";

export function Minimap({
  wrapper,
  screen,
  world,
  rotateX,
  rotateY,
}: {
  wrapper: React.RefObject<HTMLDivElement>;
  screen: React.RefObject<HTMLDivElement>;
  world: React.RefObject<HTMLDivElement>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}) {
  const grab = useUIStore((state) => state.grab);
  const setGrab = useUIStore((state) => state.setGrab);
  const zoom = useWorldStore((state) => state.zoom);
  const world_height = useWorldStore((state) => state.world_height);
  const world_width = useWorldStore((state) => state.world_width);
  const wrapper_height = useWorldStore((state) => state.wrapper_height);
  const wrapper_width = useWorldStore((state) => state.wrapper_width);
  const willChange = useWillChange();
  const dragControls = useDragControls();
  const { scrollX, scrollY } = useScroll();
  const translateY = useTransform(
    scrollY,
    [0, world_height],
    [0, zoom || grab ? 0 : wrapper_height()]
  );
  const translateX = useTransform(
    scrollX,
    [0, world_width],
    [0, zoom || grab ? 0 : wrapper_width()]
  );

  return (
    <div
      className={`fixed bottom-4 right-4 isolate z-40 select-none overflow-hidden rounded-md border-[1px]
      border-current  bg-white opacity-0 shadow-md transition-opacity delay-200 hover:opacity-100 dark:bg-black`}
    >
      <motion.div
        ref={wrapper}
        className="relative m-1"
        style={{
          height: wrapper_height(),
          width: wrapper_width(),
        }}
        // ! bug: sends screen out of frame
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
            const mx = info.delta.x;
            const my = info.delta.y;
            // ! bug: scrolls the minimap
            window.scrollBy({
              left: mx,
              top: my,
            });
          }}
          style={{
            willChange,
            rotateX,
            rotateY,
            translateY,
            translateX,
          }}
          dragListener={!zoom}
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
          }}
          whileDrag={{
            cursor: "grabbing",
            scale: 0.9,
          }}
          ref={screen}
          className="absolute origin-center touch-none rounded-md border-[1px] border-current shadow-md transition-shadow hover:shadow-xl"
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
