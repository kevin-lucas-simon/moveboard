import {ChannelIDs} from "./element/marker/ChannelID";

export type ColorHex = `#${string}`;

const BaseColorTypes = {
    Dark:   "dark",
    Light:  "light",
    Accent: "accent",
} as const;

export const ColorTypes = {
    ...BaseColorTypes,
    ...ChannelIDs,
} as const;

export type ColorType = typeof ColorTypes[keyof typeof ColorTypes];
