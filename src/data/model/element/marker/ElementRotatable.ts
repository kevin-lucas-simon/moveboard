import {ElementModel} from "../ElementModel";
import {AngleLike} from "../../Angle";

export type ElementRotatable = ElementModel & {
    rotation: AngleLike;
}

export const ElementRotatableDefault = {
    rotation: {x: 0, y: 0, z: 0},
} as const;

export function isElementRotatable(element: ElementModel): element is ElementRotatable {
    return (element as ElementRotatable).rotation !== undefined;
}
