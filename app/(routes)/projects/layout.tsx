import { getMediums, getProjects } from "sanity.utils";
import Medium from "./(medium)/medium";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Aite, for your info",
  description: "Personal website of Aite Aigbe",
};

export const viewport = {
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
  // console.log(mediums);

  return (
    <ul className="pointer-events-none relative flex h-full w-full justify-center self-center overflow-visible">
      {mediums.map((medium) => (
        <Medium key={medium} medium={medium} projects={projects}>
          {children}
        </Medium>
      ))}
    </ul>
  );
}
