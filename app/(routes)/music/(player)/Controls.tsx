"use client";

import { useAudioStore } from "@hooks/useAudioStore";
import {
  BsFastForwardBtnFill,
  BsFillRewindBtnFill,
  BsPauseBtnFill,
  BsPlayBtnFill,
} from "react-icons/bs";
import {
  IoMdVolumeHigh,
  // IoVolumeMedium,
  // IoMdVolumeLow,
  IoMdVolumeMute,
} from "react-icons/io";
import { useState } from "react";

export default function Controls() {
  const [
    song,
    setSong,
    volume,
    setVolume,
    muted,
    setMuted,
    playing,
    setPlaying,
    playlist,
    time,
    changeTime,
  ] = useAudioStore(
    (s) => [
      s.song,
      s.setSong,
      s.volume,
      s.setVolume,
      s.muted,
      s.setMuted,
      s.playing,
      s.setPlaying,
      s.playlist,
      s.time,
      s.changeTime,
    ]
  );

  const [volumeBar, setVolumeBar] = useState(false);
  const hide = setTimeout(() => {
    setVolumeBar(false);
  }, 5000);

  const changeSong = (direction: number) => {
    const index = playlist.findIndex((s) => s.name === song?.name);
    if (index + direction === -1) {
      setSong(playlist[playlist.length - 1]);
    } else if (index + direction === playlist.length) {
      setSong(playlist[0]);
    } else {
      setSong(playlist[index + direction]);
    }
  };
  return (
    <div
      className={`flex w-full flex-row items-center justify-center border-[1px]  bg-[var(--arc-palette-minContrastColor,#F1F8FEaa)] dark:bg-black/75 hover:bg-opacity-100 focus:bg-[var(--arc-palette-title,_rgb(255_255_255_/_1))] dark:hover:bg-black dark:hover:bg-opacity-70 focus:dark:bg-black focus:dark:bg-opacity-70 focus:bg-opacity-70 border-current py-1 px-2 transition-all rounded-full ${
        song ? "pointer-events-auto" : "pointer-events-none opacity-50"
      }}`}
    >
      {/* <button type="button" title="shuffle">
            <BsShuffle className=" w-8" />
          </button> */}
      <button
        type="button"
        onClick={() => changeSong(-1)}
        title="back"
        className=" pointer-events-auto"
      >
        <BsFillRewindBtnFill className=" w-8" />
      </button>
      <button
        type="button"
        title="play"
        className=" pointer-events-auto"
        disabled={!song}
        onClick={() => song && setPlaying()}
      >
        {playing ? (
          <BsPauseBtnFill className=" w-8" />
        ) : (
          <BsPlayBtnFill className=" w-8" />
        )}
      </button>
      <button
        type="button"
        onClick={() => changeSong(1)}
        title="forward"
        className=" pointer-events-auto"
      >
        <BsFastForwardBtnFill className=" w-8" />
      </button>
      {/* <button type="button" title="repeat">
            <TbRepeatOff className=" w-8" />
          </button> */}
      <input
        id="track"
        title="track"
        placeholder="track"
        className="range [&::-webkit-slider-runnable-track]:!bg-current/25 pointer-events-auto h-8 pl-2 w-full appearance-none bg-transparent accent-current "
        type="range"
        value={time}
        min={0}
        max={100}
        onChange={changeTime}
      ></input>
      {/* <div className=" flex flex-row gap-2">
        <button
          type="button"
          title="volume"
          onMouseOver={() => {
            clearInterval(hide);
            setVolumeBar(true);
          }}
          className=" pointer-events-auto relative flex flex-row items-center justify-center gap-1 hover:opacity-50"
          onClick={() => setMuted()}
        >
          {muted ? (
            <IoMdVolumeMute className=" w-8" />
          ) : (
            <IoMdVolumeHigh className=" w-8" />
          )}
        </button>
        <div
          className={` top-[-1.5rem] left-0 h-4 w-20 bg-transparent transition-all ${
            volumeBar ? "opacity-100" : "opacity-0"
          }`}
        >
          {volumeBar ? (
            <input
              id="volume"
              title="volume"
              placeholder="volume"
              className="range pointer-events-auto h-4 w-full bg-transparent accent-current"
              type="range"
              value={volume}
              min="0"
              max="100"
              onChange={(e) => {
                setVolume(e);
                console.log(e);
              }}
              onMouseOver={() => {
                clearInterval(hide);
                setVolumeBar(true);
              }}
              onMouseOut={() => hide}
            ></input>
          ) : null}
        </div>
      </div> */}
    </div>
  );
}
