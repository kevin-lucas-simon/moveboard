import {createUUID, UUID} from "../shared/UUID";
import {ChunkID, ChunkModel, StructureID, StructureModel} from "../structure/structure.models";
import {StructureType} from "../StructureType";
import {createStructure} from "../../factory/StructureFactory";

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
    const startChunk: ChunkModel = createStructure<ChunkModel>(StructureType.Chunk);

    return {
        id: createUUID(),
        name: "New Level",
        start: startChunk.id,
        structures: {
            [startChunk.id]: startChunk,
        },
    };
}