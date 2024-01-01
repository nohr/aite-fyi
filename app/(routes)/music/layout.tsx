import Explorer from "./(explorer)";
import Player from "./(player)";
import Settings from "./settings";

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full max-w-prose flex-col items-start justify-between gap-1 md:grid-rows-[0.5fr_3fr] md:gap-4">
      <Explorer />
      <Settings />
      <Player />
      {children}
    </div>
  );
}
