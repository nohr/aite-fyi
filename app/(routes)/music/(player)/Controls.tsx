"use client";

import { useAudioStore } from "@hooks/useAudioStore";
import {
  BsFastForwardBtnFill,
  BsFillRewindBtnFill,
  BsPauseBtnFill,
  BsPlayBtnFill,
} from "react-icons/bs";
import useSFX from "@hooks/useSFX";
import { useEffect, useState } from "react";
import Slider from "_components/slider";

export default function Controls() {
  const [song, playing, setPlaying, playlist, time, setTime] = useAudioStore(
    (s) => [s.song, s.playing, s.setPlaying, s.playlist, s.time, s.setTime],
  );

  const { setState } = useAudioStore;

  const changeSong = (direction: number) => {
    const index = playlist.findIndex((s) => s.name === song?.name);
    const audio = document.querySelector("audio") as HTMLAudioElement;
    if (index + direction === -1) {
      if (audio.currentTime > 3) {
        setPlaying();
        audio.currentTime = 0;
        setState({ time: 0 });
        setPlaying();
      } else setState({ song: playlist[playlist.length - 1] });
    } else if (index + direction === playlist.length) {
      setState({ song: playlist[0] });
    } else {
      setState({ song: playlist[index + direction] });
    }
  };
  const [play] = useSFX("/sfx/click2.mp3");
  const [playerTime, setPlayerTime] = useState(`0:00 / 0:00`);

  useEffect(() => {
    const audio = document.querySelector("audio") as HTMLAudioElement;

    if (!song || !audio || Number.isNaN(audio.duration)) return;

    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60);
    const display_time = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    const current = `${Math.floor(audio.currentTime / 60)}:${
      Math.floor(audio.currentTime % 60) < 10
        ? "0" + Math.floor(audio.currentTime % 60)
        : Math.floor(audio.currentTime % 60)
    }`;
    setPlayerTime(`${current} / ${display_time}`);
  }, [song, time]);

  return (
    <div
      className={`track relative flex h-10 w-full flex-row items-center justify-center overflow-hidden rounded-full border border-current px-2 py-1 text-[var(--arc-palette-title)] shadow-md transition-all dark:text-[var(--arc-palette-backgroundExtra)] ${
        song ? "pointer-events-auto" : "pointer-events-none opacity-50"
      }}`}
    >
      <div className="absolute left-0 top-0 -z-10 h-full w-full  bg-transparent opacity-90 backdrop-blur-md transition-all duration-150 ease-in-out [&_svg]:shadow-sm" />
      <button
        suppressHydrationWarning
        type="button"
        onClick={() => {
          changeSong(-1);
          play();
        }}
        title="rewind"
        className=" pointer-events-auto"
      >
        <BsFillRewindBtnFill className=" w-8" />
      </button>
      <button
        suppressHydrationWarning
        type="button"
        title="play"
        className=" pointer-events-auto"
        disabled={!song}
        onClick={() => {
          if (song) setPlaying();
          if (playing) play();
        }}
      >
        {playing ? (
          <BsPauseBtnFill className=" w-8" />
        ) : (
          <BsPlayBtnFill className=" w-8" />
        )}
      </button>
      <button
        suppressHydrationWarning
        type="button"
        onClick={() => {
          changeSong(1);
          play();
        }}
        title="forward"
        className=" pointer-events-auto"
      >
        <BsFastForwardBtnFill className=" w-8" />
      </button>
      {/* <button type="button" title="repeat">
            <TbRepeatOff className=" w-8" />
          </button> */}
      {/* <input
        suppressHydrationWarning
        id="track"
        className="track pointer-events-auto w-full cursor-pointer bg-current accent-current [&::-webkit-slider-runnable-track]:h-[1px] [&::-webkit-slider-thumb]:!h-6 [&::-webkit-slider-thumb]:!w-4"
        type="range"
        value={time}
        min={0}
        max={100}
        step={1}
        onInput={setTime}
      ></input> */}
      <Slider min={0} max={100} value={time} onChange={setTime} />
      {song ? (
        <p
          draggable={false}
          className=" pointer-events-none w-24 select-none whitespace-nowrap  px-2 text-[0.5rem] font-bold"
        >
          {playerTime}
        </p>
      ) : null}
    </div>
  );
}
