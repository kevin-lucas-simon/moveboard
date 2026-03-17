import {UUID} from "../model/UUID";
import {generateUUID} from "three/src/math/MathUtils";

export function createUUID(): UUID {
    return generateUUID() as UUID;
}