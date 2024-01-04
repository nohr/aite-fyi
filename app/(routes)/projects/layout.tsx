import { getMediums, getProjects } from "sanity.utils";
import dynamic from "next/dynamic";

const Medium = dynamic(() => import("./(medium)/medium"), {
  ssr: false,
});

export const metadata = {
  title: "projects",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#b7b7b7" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1b1b" },
  ],
  width: "device-width",
  initialScale: 1,
  userScalable: false,
};

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();
  const mediums = [...new Set(await getMediums())];

  return (
    <ul className="flex h-fit w-full flex-wrap justify-start self-start overflow-visible pt-2 md:gap-4">
      {mediums.map((medium) => (
        <Medium key={medium} medium={medium} projects={projects}>
          {children}
        </Medium>
      ))}
      <li
        id="zoom-portal"
        className=" hidden h-fit w-full flex-wrap gap-4 overflow-y-scroll px-1 md:flex"
      />
      <li
        id="project-portal"
        className=" flex h-fit w-full flex-wrap gap-4 overflow-y-scroll px-1 py-6"
      />
    </ul>
  );
}
