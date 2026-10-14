// Sampled from the supplied swatches after converting their embedded profile to sRGB.
// Keep these external-widget colours aligned with the CSS palette tokens.
export const BRAND_PALETTE = {
  yellow: '#ffbf18',
  navy: '#1a1547',
  pink: '#e71652',
  teal: '#34b59b',
  blue: '#07304e',
  light: '#f5f7f8',
  black: '#050505',
  gray: '#515359',
} as const;

export const CLERK_PALETTE = {
  colorPrimary: BRAND_PALETTE.navy,
  colorForeground: BRAND_PALETTE.navy,
  colorMutedForeground: BRAND_PALETTE.gray,
  colorBackground: BRAND_PALETTE.light,
  colorInput: BRAND_PALETTE.light,
  colorInputForeground: BRAND_PALETTE.navy,
  colorDanger: BRAND_PALETTE.pink,
};
