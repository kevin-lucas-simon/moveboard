import {Vector3Like} from "three";
import {JointID, JointModel} from "./JointModel";
import {ElementID, ElementModel} from "../element/ElementModel";
import {createUUID, UUID} from "../shared/UUID";
import {ElementType} from "../element/ElementType";
import {FloorBlockModel} from "../element/block/FloorBlockModel";

/**
* API data model
*/
export type ChunkID = UUID;
export type ChunkModel = {
    id: ChunkID,
    name: string,
    player: Vector3Like,
    joints: {[key: JointID]: JointModel},
    elements: {[key: ElementID]: ElementModel},
}

export function createChunk(): ChunkModel {
    const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);

    // createElement() results to "access before initialization" building problems here :/
    const floorBlock: FloorBlockModel = {
        id: createUUID(),
        type: ElementType.FloorBlock,
        parent: null,
        position: { x: 0, y: -1, z: 0 },
        dimension: { x: 3, y: 1, z: 3 },
        color: randomColor,
        hidden: false,
    }

    return {
        id: createUUID(),
        name: "New Chunk",
        player: { x: 0, y: 0, z: 0 },
        joints: {},
        elements: {
            [floorBlock.id]: floorBlock,
        },
    };
}
