import { parseToRgb } from 'polished';

export const hexToRGBA = (hex: string, alpha?: number) => {
  const colors = parseToRgb(hex);

  return `${colors.red}, ${colors.green}, ${colors.blue}, ${
    alpha ?? (colors as any).alpha ?? 1
  }`;
};
