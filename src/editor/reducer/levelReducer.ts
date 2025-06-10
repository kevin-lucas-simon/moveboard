import {LevelModel} from "../../model/LevelModel";
import {chunkReducer, ChunkReducerActions} from "./chunkReducer";
import {ChunkBuilder} from "../../model/builder/ChunkBuilder";
import {LevelBuilder} from "../../model/builder/LevelBuilder";
import {ChunkID} from "../../model/ChunkModel";

export type LevelReducerState = {
    level: LevelModel,
    active: ChunkID,
};

export type LevelReducerActions = ChunkReducerActions | {
    type: 'level_select_chunk',
    payload: ChunkID,
} | {
    type: 'level_add_chunk',
    payload: string,
} | {
    type: 'level_remove_chunk',
    payload: ChunkID,
} | {
    type: 'level_update_field',
    payload: {
        key: keyof LevelModel;
        value: any;
    }
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
        case "level_add_chunk":
            const newChunk = ChunkBuilder
                .create(action.payload)
                .build();

            return {
                ...state,
                active: newChunk.id,
                level: LevelBuilder
                    .from(state.level)
                    .withChunk(newChunk)
                    .build()
            };
        case "level_remove_chunk":
            // if the active chunk is being removed, reset to start chunk
            return {
                ...state,
                active: state.active === action.payload ? state.level.start : state.active,
                level: LevelBuilder
                    .from(state.level)
                    .withoutChunk(action.payload)
                    .build()
            }
        case 'level_update_field':
            if (!(action.payload.key in state.level)) {
                throw new Error(`Invalid field key: ${action.payload.key}`);
            }
            if (['chunks'].includes(action.payload.key)) {
                throw new Error('Use dedicated actions for chunks');
            }
            return {
                ...state,
                level: LevelBuilder
                    .from(state.level)
                    .with(action.payload.key, action.payload.value)
                    .build()
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