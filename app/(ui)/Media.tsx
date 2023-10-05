"use client";

import { useAudioStore } from "@hooks/useAudioStore";
import { useCallback, useEffect, useRef } from "react";

export default function Media() {
  const [song, volume, playing, setSong, playlist, time, setTime, setAudio] =
    useAudioStore(
      (s) => [
        s.song,
        s.volume,
        s.playing,
        s.setSong,
        s.playlist,
        s.time,
        s.setTime,
        s.setAudio,
      ]
    );

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      setAudio(audioRef.current);
    }
  }, [audioRef, setAudio]);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play();
        const index = playlist.findIndex((s) => s.name === song?.name);
        playlist[index].duration = audioRef.current.duration;
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing, playlist, song?.name]);

  return (
    <div className="">
      {song === null ? null : (
        <audio
          ref={audioRef}
          src={`${song?.file}?dl=` + song?.name + ".mp3"}
          autoPlay={playing}
          playsInline
          onTimeUpdate={setTime}
          onEnded={(e) => {
            if (e.currentTarget.loop) {
              e.currentTarget.play();
            } else if (playlist[playlist.length - 1] === song) {
              setSong(playlist[0]);
            } else {
              const index = playlist.findIndex((s) => s.name === song?.name);
              setSong(playlist[index + 1]);
            }
          }}

          // volume={volume}
          // onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        ></audio>
      )}
    </div>
  );
}
