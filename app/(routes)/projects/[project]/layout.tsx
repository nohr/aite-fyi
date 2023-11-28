import { Device } from "(3D)/Device";
import { Three } from "@helpers/components/Three";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      <Three>
        <Device />
      </Three>
    </>
  );
}
