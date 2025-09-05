import {createUUID, UUID} from "../shared/UUID";
import {StructureTypes} from "../structure/StructureTypes";
import {createStructure} from "../../factory/StructureFactory";
import {ChunkID, ChunkModel} from "../structure/spacial/ChunkModel";
import {StructureID, StructureModel} from "../structure/StructureModel";

/**
 * API data model
 */
export type LevelID = UUID;
export type LevelModel = {
    id: LevelID,
    name: string,
    start: ChunkID,
    structures: {[key: StructureID]: StructureModel}
}

export function createLevel(): LevelModel {
    const startChunk: ChunkModel = createStructure<ChunkModel>(StructureTypes.Chunk);

    return {
        id: createUUID(),
        name: "New Level",
        start: startChunk.id,
        structures: {
            [startChunk.id]: startChunk,
        },
    };
}