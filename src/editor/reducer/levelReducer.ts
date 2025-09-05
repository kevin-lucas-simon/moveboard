import {LevelModel} from "../../data/model/world/LevelModel";
import {chunkReducer, ChunkReducerActions} from "./chunkReducer";
import {ChunkModel} from "../../data/model/structure/spatial/ChunkModel";
import {ElementType} from "../../data/model/element/ElementType";
import {JointModel} from "../../data/model/element/joint/JointModel";
import {StructureID, StructureModel} from "../../data/model/structure/StructureModel";

export type LevelReducerState = {
    level: LevelModel,
    active: StructureID,
};

export type LevelReducerActions = ChunkReducerActions | { // TODO actions umbenennen von chunk zu structure
    type: 'level_select_structure',
    payload: StructureID,
} | {
    type: 'level_add_structure',
    payload: StructureModel,
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
        case 'level_select_structure':
            const selectedStructureId = action.payload;
            if (!(selectedStructureId in state.level.structures)) {
                return state;
            }

            return {
                ...state,
                active: selectedStructureId,
            };
        case "level_add_structure":
            const structure = action.payload;

            return {
                ...state,
                active: structure.id,
                level: {
                    ...state.level,
                    structures: {
                        ...state.level.structures,
                        [structure.id]: structure,
                    },
                }
            };
        case "level_remove_structure": // TODO PROBLEM: Wie mit Verweisen in Joints umgehen? Zudem wie mit Verweisen in anderen Strukturen umgehen?
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
                    structures: updatedChunks,
                },
            }
        case 'level_reorder_structures': // TODO generalisierbar auf level_reorder_structures
            const structureIds = action.payload as StructureID[];
            const reorderedChunks: {[key: StructureID]: StructureModel} = {};

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
        case 'level_update_field': // TODO generalisierbar auf level_update_structure_field
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
                active: state.level.structures[state.active] ? state.active : state.level.start,
                level: action.payload,
            };
        default:
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