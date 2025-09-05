import {generateUUID} from "three/src/math/MathUtils";
import {UUID} from "../model/UUID";

export function createUUID(): UUID {
    return generateUUID() as UUID;
}