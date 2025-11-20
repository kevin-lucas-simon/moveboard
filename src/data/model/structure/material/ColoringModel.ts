import {StructureDefault, StructureModel} from "../StructureModel";
import {ColorHex, ColorType, ColorTypes} from "../../Color";

export type ColoringModel = StructureModel & Record<ColorType, ColorHex>

export const ColoringDefault: ColoringModel = {
    ...StructureDefault,
    name: "New Coloring",
    [ColorTypes.Dark]: "#000000",
    [ColorTypes.Light]: "#FFFFFF",
    [ColorTypes.Primary]: "#FF0000",
    [ColorTypes.Secondary]: "#00FF00",
    [ColorTypes.Tertiary]: "#0000FF",
}
