import {LevelModel} from "../../model/LevelModel";
import {chunkReducer, ChunkReducerActions} from "./chunkReducer";

export type LevelReducerState = {
    level: LevelModel,
    active: string,
};

export type LevelReducerActions = ChunkReducerActions | {
    type: 'level_select_chunk',
    payload: string,
} | {
    type: 'level_reset',
    payload: LevelModel,
};

export function levelReducer(
    state: LevelReducerState,
    action: LevelReducerActions,
): LevelReducerState {
    switch (action.type) {
        case 'level_select_chunk':
            return {
                ...state,
                active: action.payload,
            };
        case 'level_reset':
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