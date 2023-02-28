import { useUIStore, type MinimapProps } from "(ui)";
import { motion, useWillChange } from "framer-motion";
import { memo } from "react";
import { useWorldStore } from "./useWorldStore";

export function Minimap({ ...props }: MinimapProps) {
  const { wrapper, screen } = props;
  const setGrab = useUIStore((state) => state.setGrab);
  const zoom = useWorldStore((state) => state.zoom);
  const wrapper_height = useWorldStore((state) => state.wrapper_height);
  const wrapper_width = useWorldStore((state) => state.wrapper_width);

  const willChange = useWillChange();
  return (
    <div
      className={` relative isolate z-40 
      select-none border-l-[1px] border-b-[1px] w-[${wrapper_width()}px] border-current `}
    >
      <motion.div
        ref={wrapper}
        className="relative m-1 overflow-hidden "
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
            // ! bug: scrolls the minimap too far
            // // update window scroll position
            const mx = info.delta.x;
            const my = info.delta.y;
            document.documentElement.scrollBy({
              left: mx,
              top: my,
            });
          }}
          style={{ ...props.style, willChange }}
          dragListener={!zoom}
          onDragStart={() => setGrab(true)}
          onDragEnd={() => setGrab(false)}
          dragConstraints={screen}
          dragElastic={0.1}
          dragMomentum={false}
          // dragControls={dragControls}
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
          className="absolute origin-center touch-none rounded-md border-[1px] border-current shadow-md transition-shadow hover:shadow-xl active:shadow-xl"
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
