import {ElementID, ElementModel} from "../../data/model/element/ElementModel";

import {ChunkModel} from "../../data/model/structure/spacial/ChunkModel";
import {EditorReducerActions} from "./editorReducer";

export type ChunkReducerActions = {
    type: 'chunk_add_element';
    payload: ElementModel;
} | {
    type: 'chunk_patch_element';
    payload: Partial<ElementModel>;
} | {
    type: 'chunk_remove_element';
    payload: ElementID;
} | {
    type: 'chunk_reorder_elements';
    payload: ElementID[];
} | {
    type: 'chunk_update_field';
    payload: {
        key: keyof ChunkModel;
        value: any;
    }
};

export function chunkReducer(
    state: ChunkModel,
    action: EditorReducerActions
): ChunkModel {
    switch (action.type) {
        case 'chunk_update_field': {
            const updatedKey = action.payload.key;
            const updatedValue = action.payload.value

            if (!(updatedKey in state)) {
                throw new Error(`Invalid field key: ${updatedKey}`);
            }
            if (['elements', 'joints'].includes(updatedKey)) {
                throw new Error('Use dedicated actions for elements and joints');
            }

            return {
                ...state,
                [updatedKey]: updatedValue,
            }
        }
        case 'chunk_add_element': {
            const element = action.payload;

            return {
                ...state,
                elements: {
                    ...state.elements,
                    [element.id]: element,
                }
            }
        }
        case 'chunk_patch_element': {
            const { id, ...patch } = action.payload;
            if (!id) {
                throw new Error('Element ID is required for patching');
            }
            if (
                (['type'].some(field => field in patch) && patch['type'] !== state.elements[id]?.type)
                || Object.values(patch).some(value => Array.isArray(value))
            ) {
                throw new Error('Cannot change element type or use array fields in patch');
            }

            const element = state.elements[id];
            if (!element) {
                throw new Error(`Element ID ${id} not found in state`);
            }

            return {
                ...state,
                elements: {
                    ...state.elements,
                    [id]: {
                        ...element,
                        ...patch,
                    }
                }
            }
        }
        case 'chunk_reorder_elements': {
            const elementIds = action.payload as ElementID[];
            const reorderedElements: {[key: ElementID]: ElementModel} = {};

            elementIds.forEach(id => {
                if (!state.elements[id]) {
                    throw new Error(`Reorder element ID ${id} not found in state`);
                }
                reorderedElements[id] = state.elements[id];
            });

            if (Object.keys(reorderedElements).length !== Object.keys(state.elements).length) {
                throw new Error('Reorder element IDs do not match original elements count');
            }

            return {
                ...state,
                elements: reorderedElements,
            }
        }
        case 'chunk_remove_element': {
            const removedElementId = action.payload as ElementID
            const removedElementParent = state.elements[removedElementId].parent;

            // update children elements to remove the parent reference
            Object.values(state.elements).forEach(element => {
                if (element.parent === removedElementId) {
                    element.parent = removedElementParent;
                }
            });

            // remove the element from the state
            const updatedElements = Object.fromEntries(
                Object.entries(state.elements).filter(([id]) => id !== removedElementId)
            )

            return {
                ...state,
                elements: updatedElements,
            }
        }
        default:
            return state;
    }
}