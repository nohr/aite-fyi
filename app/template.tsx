"use client";

import { useUIStore } from "@hooks/useUIStore";
import Route from "_components/animate/route";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().split("/")[1] + Date.now().toString();
  const margin = useUIStore((s) => s.navHeight);

  return (
    <>
      <Route margin={margin} pathname={pathname}>
        {children}
      </Route>
    </>
  );
}
