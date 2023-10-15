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

export default function Controls() {
  const [
    song,
    setSong,
    playing,
    setPlaying,
    playlist,
    time,
    setTime,
    updateTime,
  ] = useAudioStore((s) => [
    s.song,
    s.setSong,
    s.playing,
    s.setPlaying,
    s.playlist,
    s.time,
    s.setTime,
    s.updateTime,
  ]);

  const changeSong = (direction: number) => {
    const index = playlist.findIndex((s) => s.name === song?.name);
    const audio = document.querySelector("audio") as HTMLAudioElement;
    if (index + direction === -1) {
      if (audio.currentTime > 3) {
        setPlaying();
        audio.currentTime = 0;
        updateTime(0);
        setPlaying();
      } else setSong(playlist[playlist.length - 1]);
    } else if (index + direction === playlist.length) {
      setSong(playlist[0]);
    } else {
      setSong(playlist[index + direction]);
    }
  };
  const [play] = useSFX("/sfx/click.mp3");
  const [playerTime, setPlayerTime] = useState(`0:00 / 0:00`);

  useEffect(() => {
    const audio = document.querySelector("audio") as HTMLAudioElement;

    if (!song || !audio) return;
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60);
    const time = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    const current = `${Math.floor(audio.currentTime / 60)}:${
      Math.floor(audio.currentTime % 60) < 10
        ? "0" + Math.floor(audio.currentTime % 60)
        : Math.floor(audio.currentTime % 60)
    }`;
    setPlayerTime(`${current} / ${time}`);
  }, [time]);

  return (
    <div
      className={`flex h-10 w-full flex-row items-center justify-center rounded-full  border-[1px] border-current bg-[var(--arc-palette-minContrastColor,#F1F8FEaa)] px-2 py-1 transition-all hover:bg-opacity-100 focus:bg-[var(--arc-palette-title,_rgb(255_255_255_/_1))] focus:bg-opacity-70 dark:bg-black/75 dark:hover:bg-black dark:hover:bg-opacity-70 focus:dark:bg-black focus:dark:bg-opacity-70 ${
        song ? "pointer-events-auto" : "pointer-events-none opacity-50"
      }}`}
    >
      <button
        type="button"
        onClick={() => {
          changeSong(-1);
          play();
        }}
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
      <input
        id="track"
        className="track pointer-events-auto h-1 w-full cursor-pointer rounded-full bg-current bg-opacity-50 accent-current"
        type="range"
        value={time}
        min={0}
        max={100}
        step={1}
        onInput={setTime}
      ></input>
      {song ? (
        <p className=" whitespace-nowrap px-2 text-[0.5rem] font-bold">
          {playerTime}
        </p>
      ) : null}
    </div>
  );
}
