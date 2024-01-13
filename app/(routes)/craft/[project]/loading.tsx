import { Skeleton } from "_components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full max-w-prose flex-col gap-1 pl-2 pr-3 pt-1 md:pr-0  ">
      <Skeleton className="h-[20px] w-full rounded-sm bg-[var(--arc-palette-hover,#b7b7b7)] dark:bg-[var(--arc-palette-background,#1b1b1b)]" />
      <Skeleton className="h-[20px] w-full rounded-sm bg-[var(--arc-palette-hover,#b7b7b7)] dark:bg-[var(--arc-palette-background,#1b1b1b)]" />
      <Skeleton className=" h-[20px] w-[75%] rounded-sm bg-[var(--arc-palette-hover,#b7b7b7)] text-current dark:bg-[var(--arc-palette-background,#1b1b1b)]" />
      <div className=" flex flex-row justify-between">
        <Skeleton className="h-[20px] w-[200px] rounded-sm bg-[var(--arc-palette-hover,#b7b7b7)] text-current dark:bg-[var(--arc-palette-background,#1b1b1b)]" />
        <Skeleton className="h-[20px] w-[75px] rounded-sm bg-[var(--arc-palette-hover,#b7b7b7)] text-current dark:bg-[var(--arc-palette-background,#1b1b1b)]" />
      </div>
    </div>
  );
}
