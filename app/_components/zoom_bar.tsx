import { useUIStore } from "@hooks/useUIStore";
import Slider from "_components/slider";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const ZoomBar = () => {
  const zoom = useUIStore((s) => s.zoom);
  const { setState } = useUIStore;
  return (
    <div className="flex w-full flex-row flex-nowrap gap-x-2 pb-4 md:pb-0">
      <AiOutlinePlus className="h-4 w-4" />
      <Slider
        min={-5}
        max={5}
        value={zoom}
        onChange={(value) => setState({ zoom: value })}
      />
      <AiOutlineMinus className="h-4 w-4" />
    </div>
  );
};

export default ZoomBar;
