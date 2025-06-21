import {ChunkID, ChunkModel, createChunk} from "./ChunkModel";
import {createUUID, UUID} from "../shared/UUID";

/**
 * API data model
 */
export type LevelID = UUID;
export type LevelModel = {
    id: LevelID,
    name: string,
    start: ChunkID,
    chunks: {[key: ChunkID]: ChunkModel},
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
    };
}