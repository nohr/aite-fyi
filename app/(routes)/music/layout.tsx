import { getSongs } from "sanity.utils";
import Explorer from "./(explorer)";
import Player from "./(player)";
import Settings from "./settings";

export default async function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const songs = await getSongs();
  return (
    <div className="mx-auto flex h-full w-full max-w-prose flex-col items-start justify-between gap-1 md:grid-rows-[0.5fr_3fr] md:gap-4 md:px-8">
      <Explorer />
      <Settings />
      <Player songs={songs} />
      {children}
    </div>
  );
}
