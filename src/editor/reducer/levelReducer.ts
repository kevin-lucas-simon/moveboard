import {LevelModel} from "../../model/LevelModel";
import {chunkReducer, ChunkReducerActions} from "./chunkReducer";

export type LevelReducerState = {
    level: LevelModel,
    active: string,
};

export type LevelReducerActions = ChunkReducerActions | {
    type: 'select_chunk',
    payload: string,
} | {
    type: 'reset_level',
    payload: LevelModel,
};

export function levelReducer(
    state: LevelReducerState,
    action: LevelReducerActions,
): LevelReducerState {
    switch (action.type) {
        case 'select_chunk':
            return {
                ...state,
                active: action.payload,
            };
        case 'reset_level':
            // use current active, if not available use level start;
            return {
                ...state,
                active: state.level.chunks[state.active] ? state.active : state.level.start,
                level: action.payload,
            };
        default:
            // delegate to chunkReducer for active chunk actions
            return {
                ...state,
                level: {
                    ...state.level,
                    chunks: {
                        ...state.level.chunks,
                        [state.active]: chunkReducer(state.level.chunks[state.active], action),
                    },
                },
            };
    }
}