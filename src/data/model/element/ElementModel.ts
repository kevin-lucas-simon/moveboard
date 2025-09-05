import {Vector3Like} from "three";
import {UUID} from "../system/UUID";
import {ElementTypes} from "./ElementTypes";

/**
 * API data model for generic elements
 * Fallback element for unknown element types
 */
export type ElementID = UUID;
export type ElementModel = {
    id: ElementID,
    type: ElementTypes,
    name: string,
    parent: ElementID | null,
    position: Vector3Like,
    hidden: boolean,
}

/**
 * Editor default values for generic elements
 * All element implementations are descendants from this object
 */
export const ElementDefault: ElementModel = {
    id: '000-000', // set by createElement()
    type: ElementTypes.Unknown,
    name: "",
    parent: null,
    position: {x: 0, y: 0, z: 0},
    hidden: false,
}
