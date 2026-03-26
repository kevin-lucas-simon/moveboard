import {LevelModel} from "../../data/model/world/LevelModel";
import {ChunkID} from "../../data/model/structure/spacial/ChunkModel";
import {StructureTypes} from "../../data/model/structure/StructureTypes";

export type LevelReducerState = {
    activeChunkID: ChunkID,
    level: LevelModel,
}

export type LevelReducerActions = {
    type: 'experience_change_chunk',
    payload: ChunkID,
};

export function levelStateReducer(
    state: LevelReducerState,
    action: LevelReducerActions,
): LevelReducerState {
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