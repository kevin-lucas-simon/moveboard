import {LevelModel} from "../../data/model/world/LevelModel";
import {chunkReducer, ChunkReducerActions} from "./chunkReducer";
import {JointModel} from "../../data/model/element/joint/JointModel";
import {ElementTypes} from "../../data/model/element/ElementTypes";
import {ChunkModel} from "../../data/model/structure/spacial/ChunkModel";
import {StructureID, StructureModel} from "../../data/model/structure/StructureModel";

export type LevelReducerState = {
    level: LevelModel,
    active: StructureID,
};

export type LevelReducerActions = ChunkReducerActions | {
    type: 'level_add_structure',
    payload: StructureModel,
} | {
    type: 'level_patch_structure',
    payload: Partial<StructureModel>,
} | {
    type: 'level_remove_structure',
    payload: StructureID,
} | {
    type: 'level_reorder_structures',
    payload: StructureID[],
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
        case "level_add_structure": {
            const structure = action.payload;

            return {
                ...state,
                level: {
                    ...state.level,
                    structures: {
                        ...state.level.structures,
                        [structure.id]: structure,
                    },
                }
            };
        }
        case "level_patch_structure": {
            const { id, ...patch } = action.payload;
            if (!id) {
                throw new Error('Structure ID is required for patching');
            }
            if (['type'].some(field => field in patch) || Object.values(patch).some(value => Array.isArray(value))) {
                throw new Error('Cannot patch structure type or array fields');
            }

            const structure = state.level.structures[id];
            if (!structure) {
                throw new Error(`Structure with ID ${id} not found`);
            }

            return {
                ...state,
                level: {
                    ...state.level,
                    structures: {
                        ...state.level.structures,
                        [id]: {
                            ...structure,
                            ...patch,
                        },
                    },
                },
            };
        }
        case "level_remove_structure": { // TODO PROBLEM: Wie mit Verweisen in Joints umgehen? Zudem wie mit Verweisen in anderen Strukturen umgehen?
            const removedChunkId = action.payload;

            // update active chunk to level start if the removed chunk is currently active
            const updatedActive = state.active === action.payload ? state.level.start : state.active;

            // remove chunk from level
            const updatedChunks = Object.fromEntries(
                Object.entries(state.level.structures).filter(([key]) => key !== removedChunkId)
            )

            // update joints in remaining chunks to remove references to the removed chunk
            // TODO ganz heißes Eisen, hier nochmal refactoren!
            Object.entries(updatedChunks).forEach(([_, chunk]) => {
                Object.entries((chunk as ChunkModel).elements).forEach(([_, element]) => {
                    if (
                        element.type === ElementTypes.Joint
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
                    structures: updatedChunks,
                },
            }
        }
        case 'level_reorder_structures': {
            const structureIds = action.payload as StructureID[];
            const reorderedChunks: { [key: StructureID]: StructureModel } = {};

            structureIds.forEach(id => {
                if (!state.level.structures[id]) {
                    throw new Error(`Reorder chunk ID ${id} not found in state`);
                }
                reorderedChunks[id] = state.level.structures[id];
            });

            if (Object.keys(reorderedChunks).length !== Object.keys(state.level.structures).length) {
                throw new Error('Reorder chunk IDs do not match original chunks count');
            }

            return {
                ...state,
                level: {
                    ...state.level,
                    structures: reorderedChunks,
                },
            };
        }
        case 'level_update_field': {
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
        }
        case 'level_reset': {
            // use current active, if not available use level start;
            return {
                ...state,
                active: state.level.structures[state.active] ? state.active : state.level.start,
                level: action.payload,
            };
        }
        default: {
            // delegate to chunkReducer for active chunk actions
            return {
                ...state,
                level: {
                    ...state.level,
                    structures: {
                        ...state.level.structures,
                        [state.active]: chunkReducer(state.level.structures[state.active] as ChunkModel, action),
                    },
                },
            };
        }
    }
}