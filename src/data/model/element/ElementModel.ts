import {Vector3Like} from "three";
import {createUUID, UUID} from "../shared/UUID";
import {ElementType} from "./ElementType";
import {elementConfig, elementFallbackConfig} from "../../../config/elementConfig";

/**
 * API data model for generic elements
 * Fallback element for unknown element types
 */
export type ElementID = UUID;
export type ElementModel = {
    id: ElementID,
    type: ElementType,
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
    type: ElementType.GenericElement,
    parent: null,
    position: {x: 0, y: 0, z: 0},
    hidden: false,
}

export function createElement(type: ElementType): ElementModel {
    return {
        ...elementConfig[type]?.defaultProps || elementFallbackConfig.defaultProps,
        id: createUUID(),
        type: type,
    };
}