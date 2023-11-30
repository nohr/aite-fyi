"use client";

import { useAudioStore } from "@hooks/useAudioStore";
import useSFX from "@hooks/useSFX";
import Image from "next/image";
import { useState } from "react";
import { RiLoaderFill } from "react-icons/ri";
import { Song } from "types/Song";

export default function File({ song }: { song: Song }) {
  const [setSong, setPlaying] = useAudioStore((s) => [s.setSong, s.setPlaying]);

  // console.log(song);
  const [play] = useSFX("/sfx/click.mp3");

  const [confirm, setConfirm] = useState(false);
  return (
    <button
      type="button"
      title="play"
      key={song.name}
      onClick={() => {
        if (confirm) {
          play();
          setSong(song);
          setPlaying(true);
        } else {
          setConfirm(true);
          setTimeout(() => setConfirm(false), 1000);
        }
      }}
      className={`pointer-events-auto flex aspect-square flex-col items-center justify-center gap-1 rounded-sm border border-transparent p-1 transition-all
          ${confirm ? " item" : ""}`}
    >
      <div className="pointer-events-auto relative aspect-square h-[50px] w-[50px] overflow-hidden rounded-sm border border-current">
        {song.cover ? (
          <Image
            src={song.cover}
            alt={song.name}
            fill
            sizes="50px"
            className="pointer-events-auto absolute object-cover"
          />
        ) : (
          <RiLoaderFill className="pointer-events-auto animate-spin" />
        )}
      </div>
      <div className="pointer-events-auto">{song.name}</div>
    </button>
  );
}
