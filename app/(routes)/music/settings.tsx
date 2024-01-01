"use client";

import { useAudioStore } from "@hooks/useAudioStore";
import React from "react";
// import { BsFillVolumeOffFill, BsFillVolumeUpFill } from "react-icons/bs";

const Settings = () => {
  const [volume, setVolume, muted, setMuted] = useAudioStore((s) => [
    s.volume,
    s.setVolume,
    s.muted,
    s.setMuted,
  ]);

  return (
    <div className=" flex w-full flex-row justify-end p-4 font-mono font-light tracking-wide md:order-3 md:justify-start ">
      {/* <h2>Settings</h2> */}
      {/* <label>
        Volume:
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </label> */}
      <button
        onClick={() => setMuted()}
        className="text-md hover:animate-pulse"
      >
        SFX {!muted ? "ON" : "OFF"}
      </button>
    </div>
  );
};

export default Settings;
