import {UUID} from "../model/UUID";
import {MathUtils} from "three";

export function createUUID(): UUID {
    return MathUtils.generateUUID() as UUID;
}