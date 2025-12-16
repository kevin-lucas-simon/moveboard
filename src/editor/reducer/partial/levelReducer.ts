import {LevelModel} from "../../../data/model/world/LevelModel";
import {chunkReducer, ChunkReducerActions} from "./structure/chunkReducer";
import {ChunkModel} from "../../../data/model/structure/spacial/ChunkModel";
import {StructureID, StructureModel} from "../../../data/model/structure/StructureModel";
import {EditorReducerActions, EditorReducerState} from "../editorReducer";
import {SortableListService} from "../util/SortableListService";

export type LevelReducerState = {
    level: LevelModel,
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
    payload: {
        parentId: StructureID | null,
        childIds: StructureID[],
    },
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
    state: EditorReducerState,
    action: EditorReducerActions,
): EditorReducerState {
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
            if (
                (['type'].some(field => field in patch) && patch['type'] !== state.level.structures[id]?.type)
                || Object.values(patch).some(value => Array.isArray(value))
            ) {
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
        case "level_remove_structure": {
            const removeID = action.payload;
            if (removeID === state.level.start) {
                throw new Error('Cannot remove the start structure');
            }

            const updatedStructures = { ...state.level.structures };
            delete updatedStructures[removeID];

            const removeParentID = state.level.structures[removeID]?.parent;
            Object.values(updatedStructures)
                .filter(structure => structure.parent === removeID)
                .forEach(structure => {
                    updatedStructures[structure.id] = {
                        ...structure,
                        parent: removeParentID,
                    };
                });

            const updatedSelectedStructure = state.selectedStructure === removeID
                ? state.level.start
                : state.selectedStructure;

            return {
                ...state,
                selectedStructure: updatedSelectedStructure,
                level: {
                    ...state.level,
                    structures: updatedStructures,
                },
            }
        }
        case 'level_reorder_structures': {
            const newOrder = SortableListService.reorderParentItems<StructureModel>(
                Object.values(state.level.structures),
                action.payload.parentId,
                action.payload.childIds,
            );

            return {
                ...state,
                level: {
                    ...state.level,
                    structures: newOrder,
                },
            };
        }
        case 'level_update_field': {
            const updatedKey = action.payload.key;
            const updatedValue = action.payload.value;

            if (!(updatedKey in state.level)) {
                throw new Error('Invalid field key: ' + updatedKey);
            }
            if (['chunks'].includes(updatedKey)) {
                throw new Error('Use dedicated actions for chunks');
            }

            return {
                ...state,
                level: {
                    ...state.level,
                    [updatedKey]: updatedValue,
                },
            };
        }
        default: {
            return {
                ...state,
                level: {
                    ...state.level,
                    structures: {
                        ...state.level.structures,
                        [state.selectedStructure]: chunkReducer(state.level.structures[state.selectedStructure] as ChunkModel, action),
                    },
                },
            };
        }
    }
}