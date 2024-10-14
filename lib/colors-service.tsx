import { argbFromRgb, blueFromArgb, greenFromArgb, Hct, redFromArgb } from '@material/material-color-utilities';

export function rgbToHct(rgbColor: { r: number; g: number; b: number }): Hct {
  const argb = argbFromRgb(rgbColor.r, rgbColor.g, rgbColor.b);
  return Hct.fromInt(argb);
}

export function argbToCSSRgb(argb: number) {
  return `rgb(${redFromArgb(argb)} ${greenFromArgb(argb)} ${blueFromArgb(argb)})`;
}
