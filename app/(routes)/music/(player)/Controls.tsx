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
      className={`track flex h-10 w-full flex-row items-center justify-center rounded-full border border-current bg-[var(--arc-palette-title,#ece3e3aa)] bg-opacity-70 px-2 py-1 transition-all hover:bg-[var(--arc-palette-title,#ece3e3)] hover:bg-opacity-100 dark:bg-[var(--arc-palette-backgroundExtra,#060a0caa)] dark:bg-opacity-70 dark:hover:bg-[var(--arc-palette-backgroundExtra,#060a0c)] dark:hover:bg-opacity-100 ${
        song ? "pointer-events-auto" : "pointer-events-none opacity-50"
      }}`}
    >
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
      <input
        suppressHydrationWarning
        id="track"
        className="track pointer-events-auto h-1 w-full cursor-pointer rounded-full bg-current bg-opacity-50 accent-current dark:bg-current dark:accent-current"
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
