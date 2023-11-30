import { useEffect } from "react";
import { useUIStore } from "./useUIStore";
// import { usePathname } from "next/navigation";

type Thing = boolean | object | string | number | undefined | null;

const useLoading = (thing: Thing = "nothing") => {
  const setLoading = useUIStore((s) => s.setLoading);
  // const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
    return () => {
      setLoading(true);
    };
  }, [setLoading, thing]);
};

export default useLoading;
