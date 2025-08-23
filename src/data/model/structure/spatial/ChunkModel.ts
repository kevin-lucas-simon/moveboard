import {Vector3Like} from "three";
import {ElementID, ElementModel} from "../../element/ElementModel";
import {createUUID} from "../../shared/UUID";
import {ElementType} from "../../element/ElementType";
import {FloorBlockModel} from "../../element/block/FloorBlockModel";
import {StructureID, StructureModel} from "../StructureModel";
import {StructureType} from "../StructureType";

/**
* API data model
*/
export type ChunkID = StructureID;
export type ChunkModel = StructureModel & {
    id: ChunkID,
    player: Vector3Like,
    elements: {[key: ElementID]: ElementModel},
}

export const ChunkDefault: ChunkModel = {
    id: '000-000', // TODO
    type: StructureType.Chunk,
    name: "New Chunk", // TODO
    player: { x: 0, y: 0, z: 0 },
    elements: {}, // TODO
}

export function createChunk(): ChunkModel { // TODO
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);

    // createElement() results to "access before initialization" building problems here :/
    const floorBlock: FloorBlockModel = {
        id: createUUID(),
        type: ElementType.FloorBlock,
        name: "",
        parent: null,
        position: { x: 0, y: -1, z: 0 },
        dimension: { x: 3, y: 1, z: 3 },
        color: randomColor,
        hidden: false,
    }

    return {
        id: createUUID(),
        type: StructureType.Chunk,
        name: "New Chunk",
        player: { x: 0, y: 0, z: 0 },
        elements: {
            [floorBlock.id]: floorBlock,
        },
    };
}
