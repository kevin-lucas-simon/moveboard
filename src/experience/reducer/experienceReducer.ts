import {LevelModel} from "../../data/model/world/LevelModel";
import {ChunkID} from "../../data/model/structure/spacial/ChunkModel";
import {StructureTypes} from "../../data/model/structure/StructureTypes";

export type ExperienceReducerState = {
    activeChunkID: ChunkID,
    level: LevelModel,
}

export type ExperienceReducerActions = {
    type: 'experience_change_chunk',
    payload: ChunkID,
};

export function experienceReducer(
    state: ExperienceReducerState,
    action: ExperienceReducerActions,
): ExperienceReducerState {
    switch (action.type) {
        case "experience_change_chunk": {
            if (state.level.structures[action.payload].type !== StructureTypes.Chunk) {
                console.warn(`Tried to change to non-existing chunk with id ${action.payload}`);
                return state;
            }

            return {
                ...state,
                activeChunkID: action.payload,
            };
        }
    }
}