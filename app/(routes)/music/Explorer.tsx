import {
  BsFastForwardBtnFill,
  BsFillRewindBtnFill,
  BsPlayBtnFill,
  //   BsShuffle,
} from "react-icons/bs";
// import { TbRepeatOff } from "react-icons/tb";

export default function Explorer() {
  return (
    // <div className="aspect-square h-full border-[1px]">Album Art</div>
    <div className="grid h-full w-full max-w-prose grid-cols-1 grid-rows-[0.5fr_3fr] items-center gap-4 ">
      <div className="pointer-events-auto flex h-full flex-col items-center justify-center gap-1 border-[1px] py-2">
        <div>Song Title ft. u</div>
        <div className="flex w-full flex-row items-center justify-center">
          {/* <button type="button" title="shuffle">
            <BsShuffle className=" w-8" />
          </button> */}
          <button type="button" title="back">
            <BsFillRewindBtnFill className=" w-8" />
          </button>
          <button type="button" title="play">
            <BsPlayBtnFill className=" w-8" />
          </button>
          <button type="button" title="forward">
            <BsFastForwardBtnFill className=" w-8" />
          </button>
          {/* <button type="button" title="repeat">
            <TbRepeatOff className=" w-8" />
          </button> */}
          <label htmlFor="track"></label>
          <input
            title="track"
            type="range"
            //   value={0}
            //   onChange={() => {}}
            min={0}
            max={100}
            className="w-1/2"
            placeholder="hi"
          />
        </div>
      </div>
      <div className="pointer-events-auto h-full resize-x border-[1px]">
        <div className="m-2 h-fit w-1/4 border-[1px] p-2">Search</div>
      </div>
    </div>
  );
}
