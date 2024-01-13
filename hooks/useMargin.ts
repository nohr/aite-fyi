import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function useMargin() {
  const [margin, setMargin] = useState<number>(0);
  const page = usePathname().split("/")[1];

  useEffect(() => {
    function handleMargin() {
      const nav = document.querySelector("nav");

      if (!nav) return;

      if (page === "admin") {
        setMargin(0);
        return;
      }

      setMargin(nav.clientHeight);
    }

    handleMargin();
    window.addEventListener("resize", handleMargin);
    return () => window.removeEventListener("resize", handleMargin);
  }, [page]);

  return margin;
}
