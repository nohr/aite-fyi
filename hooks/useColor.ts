import { useEffect, useState } from "react";
import { Color } from "three";
import { useUIStore } from "./useUIStore";

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

    l = (cmax + cmin) / 2;

    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(1);
    // s = 100;

    l = +(l * 100).toFixed(1) + 20;
    // console.log(h, s, l);

    // l = 90;

    return "hsl(" + h + "," + s + "%," + l + "%)";
  };
  const { setState } = useUIStore;

  useEffect(() => {
    setTimeout(() => {
      let dark =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--arc-palette-cutoutColor")
          .slice(0, -2)
          .toLocaleLowerCase() || "#405C6F";
      if (dark === "#000000" && theme === "dark") {
        dark = "#ababab";
        document.body.style.color = dark;
      }
      let light =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--arc-palette-focus")
          .slice(0, -2)
          .toLocaleLowerCase() || "#C4C4CD";

      if (light === "#787878") {
        light = "#505050";
        document.body.style.color = light;
      }

      // setColor(theme === "dark" ? dark : light);
      setColor(hexToHsl(theme === "dark" ? dark : light));
      setState({ color: theme === "dark" ? dark : light });
    }, 20);
  }, [setState, theme]);

  return { color, setColor };
}

export default useColor;
