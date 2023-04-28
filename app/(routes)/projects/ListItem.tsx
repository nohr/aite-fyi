import Link from "next/link";

export default function ListItem() {
  return (
    <li className="contents">
      <Link
        href={`/title`}
        className="text-md pointer-events-auto m-4 mb-0 flex w-full flex-row flex-nowrap justify-between gap-y-2 font-bold underline underline-offset-8"
      >
        Title <span>2023</span>
      </Link>
    </li>
  );
}
