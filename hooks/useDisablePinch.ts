import { useEffect } from 'react'

function useDisablePinch() {
  useEffect(() => {
    const preventPinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }

    document.addEventListener("touchmove", preventPinchZoom, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventPinchZoom);
    }
  }, []);
}

export default useDisablePinch