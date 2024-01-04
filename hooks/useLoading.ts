import { useEffect } from "react";
import { useUIStore } from "./useUIStore";
// import { usePathname } from "next/navigation";

// type Thing = boolean | object | string | number | undefined | null;

const useLoading = () => {
  const { setState } = useUIStore;

  // const pathname = usePathname();

  useEffect(() => {
    setState({ loading: false });
    return () => {
      setState({ loading: true });
    };
  }, [setState]);
};

export default useLoading;
