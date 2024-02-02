import { Skeleton } from "_components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-prose flex-col gap-1 pr-3 pt-1 md:pr-0  ">
      <div
        className="flex flex-row items-start rounded-none
            border-b border-current py-1 pl-2 md:max-w-prose md:px-0 md:pt-2"
      >
        <Skeleton className="h-[24px] w-[300px] bg-border no-underline duration-500 md:h-[40px] dark:bg-border" />
      </div>
      <Skeleton className="h-[20px] w-full rounded-sm bg-border dark:bg-border" />
      <Skeleton className="h-[20px] w-full rounded-sm bg-border dark:bg-border" />
      <Skeleton className=" h-[20px] w-[75%] rounded-sm bg-border text-current dark:bg-border" />
      <div className=" flex flex-row justify-between">
        <Skeleton className="h-[20px] w-[200px] rounded-sm bg-border text-current dark:bg-border" />
        <Skeleton className="h-[20px] w-[75px] rounded-sm bg-border text-current dark:bg-border" />
      </div>
    </div>
  );
}
