import Explorer from "./(explorer)";
import Player from "./(player)";

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-full w-full max-w-prose grid-cols-1 grid-rows-[0.5fr_3fr] items-start gap-1 md:gap-4">
      <Player />
      <Explorer />
      {children}
    </div>
  );
}
