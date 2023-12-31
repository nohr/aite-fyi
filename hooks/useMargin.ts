import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function useMargin() {
  const [margins, setMargins] = useState<[number, number]>([0, 0]);
  const page = usePathname().split("/")[1];

  useEffect(() => {
    function handleMargin() {
      const nav = document.querySelector("nav");
      const main = document.querySelector("main");

      if (!nav || !main) return;

      if (page === "admin") {
        setMargins([0, 0]);
        return;
      }

      if (window.innerWidth >= 768) setMargins([nav.clientHeight, 0]);
      else setMargins([0, nav.clientHeight]);
    }

    handleMargin();
    window.addEventListener("resize", handleMargin);
    return () => window.removeEventListener("resize", handleMargin);
  }, [page]);

  return margins;
}
