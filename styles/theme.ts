import { lighten } from 'polished';

const fontSizes = {
  xl: '64px',
  lg: '32px',
  md: '15px',
};

const palette = {
  white: '#ffffff',
  black: '#0E103C',
  darkYellow: '#7C560B',
  mutedYellow: '#FFF8EB',
  mutedOrange: '#FBEFE9',
  darkOrange: '#381A0C',
  mutedPurple: '#e3f0ff',
  purple: '#8E8CFF',
  darkPurple: '#0F1C46',
  mutedRef: '#FDE8F0',
  errorRed: '#FF656D',
};

// Based on webflow's breakpoints
const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

type BreakPointType = typeof breakpoints;

const generateMediaQueries = (points: BreakPointType) => ({
  sm: `(min-width: ${points.sm})`,
  md: `(min-width: ${points.md})`,
  lg: `(min-width: ${points.lg})`,
  xl: `(min-width: ${points.xl})`,
  hover: '(hover: hover)',
});

// Based on Bootstrap z-indexes
const zIndices = {
  sticky: 1020,
  fixed: 1030,
  overlay: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

const fontWeights = {
  h1: 600,
  semiBold: 600,
  bold: 700,
  medium: 500,
};

const opacities = {
  secondaryText: 0.6,
};

const lightTheme = {
  zIndices,
  fontWeights,
  breakpoints,
  fontSizes: {
    h1: fontSizes.xl,
    paragraph: fontSizes.md,
    navLink: fontSizes.md,
  },
  palette,
  colors: {
    backgroundColor: palette.white,
    primaryText: palette.black,
    secondaryText: lighten(opacities.secondaryText, palette.black),
  },
  mediaQueries: generateMediaQueries(breakpoints),
};

export type ITheme = typeof lightTheme;

const themes = {
  light: lightTheme,
};

export { themes };
