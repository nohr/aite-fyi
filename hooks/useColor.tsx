import React, { useEffect, useState } from 'react'
import { Color } from 'three';
import { useUIStore } from './useUIStore';

function useColor() {
  
    const [color, setColor] = useState<Color | string>("");
    const theme = useUIStore((s) => s.theme);
  
    const hexToHsl = (H: string) => {
      // Convert hex to RGB first
      let r = 0,
        g = 0,
        b = 0;
      if (H.length === 4) {
        r = parseInt("0x" + H[1] + H[1]);
        g = parseInt("0x" + H[2] + H[2]);
        b = parseInt("0x" + H[3] + H[3]);
      } else if (H.length === 7) {
        r = parseInt("0x" + H[1] + H[2]);
        g = parseInt("0x" + H[3] + H[4]);
        b = parseInt("0x" + H[5] + H[6]);
      }
      // Then to HSL
      r /= 255;
      g /= 255;
      b /= 255;
      const cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin;
      let h = 0,
        s = 0,
        l = 0;
  
      if (delta === 0) h = 0;
      else if (cmax === r) h = ((g - b) / delta) % 6;
      else if (cmax === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;
  
      h = Math.round(h * 60);
  
      if (h < 0) h += 360;
  
    //   l = (cmax + cmin) / 2;
  
    //   s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  
        //   s = +(s * 100).toFixed(1);
        s = 100;
  
        //   l = +(l * 100).toFixed(1);
        l= 90;

      return "hsl(" + h + "," + s + "%," + l + "%)";
    };
    useEffect(() => {
        setTimeout(() => {
      const dark = getComputedStyle(document.documentElement)
        .getPropertyValue("--arc-palette-foregroundSecondary")
        .slice(0, -2)
        .toLocaleLowerCase() || "#4d4d4d";
  
      const light = getComputedStyle(document.documentElement)
        .getPropertyValue("--arc-palette-subtitle")
        .slice(0, -2)
        .toLocaleLowerCase() || "#96BDD5";
  
      console.log(light, dark);
      console.log(hexToHsl(light));
  
    //   setColor(new Color(theme === "dark" ? dark : light === "#f3f1f1" ? light: hexToHsl(light)));
            setColor(theme === "dark" ? dark : hexToHsl(light)); 
        } , 500)
    }, [theme]);

    return color;
}

export default useColor