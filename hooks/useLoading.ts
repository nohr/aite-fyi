import { useEffect } from "react";
import { useUIStore } from "./useUIStore";
// import { usePathname } from "next/navigation";

// type Thing = boolean | object | string | number | undefined | null;

const useLoading = () => {
  const setLoading = useUIStore((s) => s.setLoading);
  // const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
    return () => {
      setLoading(true);
    };
  }, [setLoading]);
};

export default useLoading;
