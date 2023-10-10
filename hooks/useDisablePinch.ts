import { useEffect } from 'react'

function useDisablePinch() {
  useEffect(() => {
    const preventPinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }
 
    const wheelHandler = (e: WheelEvent) => {
        e.preventDefault()
    }
    
    document.addEventListener("touchmove", preventPinchZoom, { passive: false });
        window.addEventListener('wheel', wheelHandler, {passive: false})
    
    return () => {
      document.removeEventListener("touchmove", preventPinchZoom);
      window.removeEventListener('wheel', wheelHandler)
       
    }
  }, []);
}

export default useDisablePinch