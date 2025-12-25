import {ElementModel} from "../ElementModel";
import {ColorType, ColorTypes} from "../../Color";

export type ElementColorable = ElementModel & {
    color: ColorType,
}

export const ElementColorableDefault = {
    color: ColorTypes.Dark,
} as const;

export function isElementColorable(element: ElementModel): element is ElementColorable {
    return (element as ElementColorable).color !== undefined;
}