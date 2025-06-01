import {LevelModel} from "../../model/LevelModel";
import {chunkReducer, ChunkReducerActions} from "./chunkReducer";
import {ChunkModel} from "../../model/ChunkModel";
import {FloorBlockModel} from "../../experience/element/block/FloorBlock";

export type LevelReducerState = {
    level: LevelModel,
    active: string,
};

export type LevelReducerActions = ChunkReducerActions | {
    type: 'level_select_chunk',
    payload: string,
} | {
    type: 'level_add_chunk',
    payload: string,
} | {
    type: 'level_remove_chunk',
    payload: string,
} | {
    type: 'level_update_field',
    payload: {
        key: string;
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
            const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);

            return {
                ...state,
                level: {
                    ...state.level,
                    chunks: {
                        ...state.level.chunks,
                        [action.payload]: {
                            name: action.payload,
                            player: {
                                x: 0,
                                y: 1,
                                z: 0,
                            },
                            elements: [
                                {
                                    type: 'FloorBlock',
                                    position: {
                                        x: 0,
                                        y: 0,
                                        z: 0,
                                    },
                                    dimension: {
                                        x: 3,
                                        y: 1,
                                        z: 3,
                                    },
                                    color: randomColor,
                                } as FloorBlockModel
                            ],
                            joints: [],
                        } as ChunkModel,
                    },
                },
            };
        case "level_remove_chunk":
            // update active chunk to level start if the removed chunk is currently active
            const updatedActive = state.active === action.payload ? state.level.start : state.active;

            // remove chunk from level
            const updatedChunks = Object.fromEntries(
                Object.entries(state.level.chunks).filter(([key]) => key !== action.payload)
            )

            // update joints in remaining chunks to remove references to the removed chunk
            Object.values(updatedChunks).forEach(chunk => {
                chunk.joints = chunk.joints.map(joint =>
                    joint.neighbour === action.payload ? { ...joint, neighbour: "" } : joint
                );
            });

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
            if (['chunks'].includes(action.payload.key)) {
                throw new Error('Use dedicated actions for chunks');
            }
            return {
                ...state,
                level: {
                    ...state.level,
                    [action.payload.key]: action.payload.value,
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