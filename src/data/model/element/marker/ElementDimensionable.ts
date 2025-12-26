import {ElementModel} from "../ElementModel";
import {Vector3Like} from "three";

export type ElementDimensionable = ElementModel & {
    dimension: Vector3Like,
}

export const ElementDimensionableDefault = {
    dimension: {x: 1, y: 1, z: 1},
} as const;

export function isElementResizeable(element: ElementModel): element is ElementDimensionable {
    return (element as ElementDimensionable).dimension !== undefined;
}
