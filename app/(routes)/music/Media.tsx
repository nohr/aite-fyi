"use client";

import { useAudioStore } from "@hooks/useAudioStore";
import { useEffect, useRef } from "react";

export default function Media() {
  const [song, playing, playlist] = useAudioStore((s) => [
    s.song,
    s.playing,
    s.playlist,
  ]);

  const { setState } = useAudioStore;

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      setState({ audio: audioRef.current });
    }
  }, [audioRef, setState]);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play();
        // const index = playlist.findIndex((s) => s.name === song?.name);
        // playlist[index].duration = audioRef.current.duration;
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing, playlist, song?.name]);

  // set tempo var
  useEffect(() => {
    const r = document.querySelector(":root") as HTMLElement;
    if (!song?.tempo) return;
    const tempo = (60 / song?.tempo) * 2000;
    // console.log(tempo);

    r.style.setProperty("--tempo", `${tempo / 2 || 2000}ms`);
  }, [song]);

  return (
    <>
      {song === null ? null : (
        <audio
          ref={audioRef}
          src={`${song?.file}?dl=` + song?.name + ".mp3"}
          playsInline
          onTimeUpdate={(e) => {
            const audio = e.currentTarget;
            if (!audio || Number.isNaN(audio.duration)) return;
            setState({ time: (audio.currentTime / audio.duration) * 100 });
          }}
          onEnded={(e) => {
            if (e.currentTarget.loop) {
              e.currentTarget.play();
            } else if (playlist[playlist.length - 1] === song) {
              setState({ song: playlist[0] });
            } else {
              const index = playlist.findIndex((s) => s.name === song?.name);
              setState({ song: playlist[index + 1] });
            }
          }}

          // volume={volume}
        ></audio>
      )}
    </>
  );
}
