// async function getProjects() {
//   const res = await fetch("/api/projects", {
//     method: "GET",
//   });
//   const data = await res.json();
//   return data;
// }

import ListItem from "./ListItem";

export default function Projects() {
  const arr = Array.from({ length: 20 }, (_, i) => i);

  return (
    <ul className="pointer-events-auto flex h-full max-w-prose flex-col gap-y-2 self-start overflow-scroll px-8">
      {arr.map((_, i) => (
        <ListItem key={i} />
      ))}
    </ul>
  );
}
