export type ColorHex = `#${string}`;

export const ColorTypes = {
    Dark: "dark",
    Light: "light",
    Primary: "primary",
    Secondary: "secondary",
    Tertiary: "tertiary",
} as const;

export type ColorType = typeof ColorTypes[keyof typeof ColorTypes];