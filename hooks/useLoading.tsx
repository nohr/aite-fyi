import { useEffect } from "react";
import { useUIStore } from "./useUIStore";

type Thing = boolean | object | string | number | undefined | null;

const useLoading = (thing: Thing = "nothing") => {
  const setLoading = useUIStore((s) => s.setLoading);

  useEffect(() => {
      setLoading(false);
    return () => {
      setLoading(true);
    };
  }, [setLoading, thing]);
};

export default useLoading;
