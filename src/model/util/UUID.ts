import {generateUUID} from "three/src/math/MathUtils";

/**
 * API data model
 */
export type UUID = string;

export function createUUID(): UUID {
    return generateUUID() as UUID;
}