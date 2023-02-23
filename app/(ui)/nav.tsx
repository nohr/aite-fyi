import Link from "next/link";

export function Nav() {
  return (
    <div className="fixed top-2 z-[100] flex w-full flex-row flex-nowrap justify-between p-4">
      <Link href="/">Home</Link>
      <Link href="/page2">Page2</Link>
      <Link href="/page3">Page3</Link>
      <Link href="/about">About</Link>
      <Link href="/about2">About2</Link>
      <Link href="/about3">About3</Link>
      <Link href="/work">Work</Link>
      <Link href="/work2">Work2</Link>
      <Link href="/work3">Work3</Link>
    </div>
  );
}
