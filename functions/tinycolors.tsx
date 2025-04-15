import tinycolor from "tinycolor2";

export const lightenColor = (color: string, amount: number): string => {
  return tinycolor(color).lighten(amount).toHexString();
};

export const darkenColor = (color: string, amount: number): string => {
  return tinycolor(color).darken(amount).toHexString();
};
