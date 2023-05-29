"use client";

import { useAudioStore } from "@hooks/useAudioStore";
import Image from "next/image";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { shallow } from "zustand/shallow";

export default function File({ song }: { song: Song }) {
  const [setSong, setPlaying] = useAudioStore(
    (s) => [s.setSong, s.setPlaying],
    shallow
  );
  // console.log(song);

  const [confirm, setConfirm] = useState(false);
  return (
    <button
      type="button"
      title="play"
      key={song.name}
      onClick={() => {
        if (confirm) {
          setSong(song);
          setPlaying(true);
        } else {
          setConfirm(true);
          setTimeout(() => setConfirm(false), 1000);
        }
      }}
      className={`pointer-events-auto flex aspect-square flex-col items-center justify-center gap-1 border-[1px] border-transparent p-1 transition-all hover:!border-current hover:shadow-md
          ${
            confirm
              ? " border-current shadow-md hover:bg-current hover:bg-opacity-20 [&_*]:mix-blend-plus-lighter [&_*]:dark:mix-blend-difference"
              : ""
          }`}
    >
      <div className="pointer-events-auto aspect-square h-[50px] w-[50px] overflow-hidden border-[1px] border-current">
        {song.cover ? (
          <Image
            src={song.cover}
            alt={song.name}
            width={50}
            height={50}
            className="pointer-events-auto object-cover"
          />
        ) : (
          <FaSpinner className="pointer-events-auto animate-spin" />
        )}
      </div>
      <div className="pointer-events-auto">{song.name}</div>

      {/* <button type="button" title="play">
              <BsPlayBtnFill className="pointer-events-auto w-8" />
            </button> */}
    </button>
  );
}
