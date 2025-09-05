import {createUUID, UUID} from "../shared/UUID";
import {ChunkID, ChunkModel, StructureID, StructureModel} from "../structure/structure.models";
import {createStructure} from "../../factory/structure.factory";
import {StructureTypes} from "../structure.types";

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