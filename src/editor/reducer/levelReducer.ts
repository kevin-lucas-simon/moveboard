import {LevelModel} from "../../data/model/world/LevelModel";
import {chunkReducer, ChunkReducerActions} from "./chunkReducer";
import {ChunkID, createChunk} from "../../data/model/world/ChunkModel";
import {ElementType} from "../../data/model/element/ElementType";
import {JointModel} from "../../data/model/element/joint/JointModel";

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
            const selectedChunkId = action.payload;
            if (!(selectedChunkId in state.level.chunks)) {
                return state;
            }

            return {
                ...state,
                active: selectedChunkId,
            };
        case "level_add_chunk":
            const chunk = createChunk();
            chunk.name = action.payload;

            return {
                ...state,
                active: chunk.id,
                level: {
                    ...state.level,
                    chunks: {
                        ...state.level.chunks,
                        [chunk.id]: chunk,
                    },
                }
            };
        case "level_remove_chunk":
            const removedChunkId = action.payload;

            // update active chunk to level start if the removed chunk is currently active
            const updatedActive = state.active === action.payload ? state.level.start : state.active;

            // remove chunk from level
            const updatedChunks = Object.fromEntries(
                Object.entries(state.level.chunks).filter(([key]) => key !== removedChunkId)
            )

            // update joints in remaining chunks to remove references to the removed chunk
            Object.entries(updatedChunks).forEach(([_, chunk]) => {
                Object.entries(chunk.elements).forEach(([_, element]) => {
                    if (
                        element.type === ElementType.Joint
                        && (element as JointModel).neighbour === removedChunkId
                    ) {
                        (element as JointModel).neighbour = null;
                    }
                })
            })

            // return updated state with removed chunk
            return {
                ...state,
                active: updatedActive,
                level: {
                    ...state.level,
                    chunks: updatedChunks,
                },
            }
        case 'level_update_field':
            const updatedKey = action.payload.key;
            const updatedValue = action.payload.value;

            // validate key and value
            if (!(updatedKey in state.level)) {
                throw new Error('Invalid field key: ' + updatedKey);
            }
            if (['chunks'].includes(updatedKey)) {
                throw new Error('Use dedicated actions for chunks');
            }

            // update the level field with the new value
            return {
                ...state,
                level: {
                    ...state.level,
                    [updatedKey]: updatedValue,
                },
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