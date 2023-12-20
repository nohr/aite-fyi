"use client";

import useMargin from "@hooks/useMargin";
import Explorer from "./(explorer)";
import Player from "./(player)";

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const margins = useMargin();
  return (
    <div
      // style={{ height: `calc(100% - ${margins[0] + margins[1]}px` }}
      className="flex h-full w-full max-w-prose flex-col items-start justify-between gap-1 md:grid-rows-[0.5fr_3fr] md:gap-4"
    >
      <Explorer />
      <Player />
      {children}
    </div>
  );
}
