import {ElementModel} from "../ElementModel";
import {Vector3Like} from "three";

export type ElementResizeable = ElementModel & {
    dimension: Vector3Like,
}

export const ElementResizeableDefault = {
    dimension: {x: 1, y: 1, z: 1},
} as const;

export function isElementResizeable(element: ElementModel): element is ElementResizeable {
    return (element as ElementResizeable).dimension !== undefined;
}
