import Explorer from "./(explorer)";
import Player from "./(player)";

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-full w-full max-w-prose grid-cols-1 grid-rows-[3fr_0.5fr] items-start gap-1 md:grid-rows-[0.5fr_3fr] md:gap-4">
      <Explorer />
      <Player />
      {children}
    </div>
  );
}
