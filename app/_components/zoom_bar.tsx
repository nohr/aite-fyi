import { useUIStore } from "@hooks/useUIStore";
import Slider from "_components/slider";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const ZoomBar = () => {
  const [zoom, camera] = useUIStore((s) => [s.zoom, s.camera]);
  const { setState } = useUIStore;
  return (
    <div className="flex w-full flex-nowrap items-center justify-center gap-x-2 pb-4 md:pb-0">
      <AiOutlinePlus className="h-4 w-4" />
      <Slider
        min={camera.min}
        max={camera.max}
        value={zoom}
        onChange={(value) => setState({ zoom: value })}
        className="h-6 md:h-6"
      />
      <AiOutlineMinus className="h-4 w-4" />
    </div>
  );
};

export default ZoomBar;
