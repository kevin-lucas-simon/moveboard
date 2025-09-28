import {ValidationError} from "../../data/validator/Validator";
import {ElementID} from "../../data/model/element/ElementModel";
import {StructureID} from "../../data/model/structure/StructureModel";
import {EditorReducerActions, EditorReducerState} from "./editorReducer";

export type SelectorReducerState = {
    selectedStructures: StructureID[],
    selectedElements: ElementID[],
    errors: ValidationError[],
}

export type SelectorReducerActions = {
    type: 'editor_select_structure',
    payload: StructureID,
} | {
    type: 'editor_select_element',
    payload: ElementID,
} | {
    type: 'editor_deselect_all',
};

export function selectorReducer(
    state: EditorReducerState,
    action: EditorReducerActions,
): EditorReducerState {
    switch (action.type) {
        case "editor_select_structure": {
            // const selectedId = action.payload;
            // const selectedStructure = state.level.structures[selectedId];
            // if (!selectedStructure) {
            //     return state;
            // }
            //
            // // if a chunk is selected, it becomes the active structure and all other selections are cleared
            // if (selectedStructure.type === StructureTypes.Chunk) {
            //     return {
            //         ...state,
            //         active: selectedId,
            //         selectedStructures: [action.payload],
            //         selectedElements: [],
            //     }
            // }

            return {
                ...state,
                selectedStructures: [action.payload],
            };
        }
        case "editor_select_element": {
            // selection can be any UUID, the corresponding items will check themselves
            return {
                ...state,
                selectedElements: [action.payload],
            };
        }
        case "editor_deselect_all": {
            // deselect all items
            return {
                ...state,
                selectedElements: [],
            };
        }
        default: {
            return state;
        }
    }
}