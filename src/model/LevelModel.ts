import {ChunkID, ChunkModel} from "./ChunkModel";
import {UUID} from "./util/uuid";

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
