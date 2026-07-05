import {StructureDefault, StructureModel} from "../StructureModel";
import {ColorHex, ColorType, ColorTypes} from "../../Color";

export type ColoringModel = StructureModel & Record<ColorType, ColorHex>

export const ColoringDefault: ColoringModel = {
    ...StructureDefault,
    name: "New Coloring",
    [ColorTypes.Dark]:   "#000000",
    [ColorTypes.Light]:  "#FFFFFF",
    [ColorTypes.Accent]: "#888888",
    [ColorTypes.Chunk]:  "#00CCFF",
    [ColorTypes.Level]:  "#EEEEFF",
}
