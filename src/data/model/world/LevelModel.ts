import {ChunkID, ChunkModel, createChunk} from "./ChunkModel";
import {createUUID, UUID} from "../shared/UUID";
import {StructureID, StructureModel} from "../structure/StructureModel";

/**
 * API data model
 */
export type LevelID = UUID;
export type LevelModel = {
    id: LevelID,
    name: string,
    start: ChunkID,
    chunks: {[key: ChunkID]: ChunkModel},
    structures: {[key: StructureID]: StructureModel}
}

export function createLevel(): LevelModel {
    const startChunk: ChunkModel = createChunk();

    return {
        id: createUUID(),
        name: "New Level",
        start: startChunk.id,
        chunks: {
            [startChunk.id]: startChunk,
        },
        structures: {},
    };
}