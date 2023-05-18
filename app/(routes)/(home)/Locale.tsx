import { TbClockFilled } from "react-icons/tb";
export default function Locale() {
  return (
    <div className="pointer-events-none flex flex-row items-center gap-x-1 whitespace-nowrap text-sm opacity-50">
      <TbClockFilled />
      <p>{`16:23:66\t•\tbrooklyn, ny`}</p>
    </div>
  );
}
