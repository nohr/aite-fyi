"use client";

import File from "./File";
import { useSearchParams } from "next/navigation";
import { useAudioStore } from "@hooks/useAudioStore";
import { useEffect } from "react";
import { useUIStore } from "(ui)";

export default function Explorer() {
  const searchParams = useSearchParams();
  const playlist = useAudioStore((s) => s.playlist);
  const query = searchParams.get("query");

  // if all songs are in the playlist stop loading
  const { setState } = useUIStore;

  useEffect(() => {
    if (playlist.length > 0) {
      setState({ loading: false });
    }
    return () => {
      setState({ loading: true });
    };
  }, [playlist.length, setState]);

  return (
    <div className=" pointer-events-none -order-1 flex h-full resize-x flex-col gap-2 p-3 md:-order-none">
      {/* songs */}
      <div className="pointer-events-auto grid h-fit w-full grid-cols-4 grid-rows-1 gap-4 overflow-visible sm:gap-8 md:grid-cols-5">
        {playlist
          .filter((song: any) => {
            if (!query || query.length === 0) return true;
            return song.name.toLowerCase().includes(query.toLowerCase());
            // song.artist.toLowerCase().includes(query.toLowerCase()) ||
            // song.album.toLowerCase().includes(query.toLowerCase())
          })
          .map((song: any) => (
            <File song={song} key={song.name} />
          ))}
      </div>
    </div>
  );
}
