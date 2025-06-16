import {Vector3Like} from "three";
import {UUID} from "../shared/UUID";
import {ElementType} from "./ElementType";

/**
 * API data model for generic elements
 * Fallback element for unknown element types
 */
export type ElementID = UUID;
export type ElementModel = {
    id: ElementID,
    type: ElementType,
    position: Vector3Like,
}

/**
 * Editor default values for generic elements
 * All element implementations are descendants from this object
 */
export const ElementDefault: ElementModel = {
    id: '000-000', // set by ElementBuilder
    type: ElementType.GenericElement,
    position: {x: 0, y: 0, z: 0},
}