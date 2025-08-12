import {ChunkModel} from "../../data/model/world/ChunkModel";
import {ElementID, ElementModel} from "../../data/model/element/ElementModel";
import {JointModel} from "../../data/model/world/JointModel";

export type ChunkReducerActions = {
    type: 'chunk_add_element';
    payload: ElementModel;
} | {
    type: 'chunk_update_element';
    payload: ElementModel;
} | {
    type: 'chunk_remove_element';
    payload: ElementID;
} | {
    type: 'chunk_reorder_elements';
    payload: ElementID[];
} | {
    type: 'chunk_add_joint';
    payload: JointModel;
} | {
    type: 'chunk_update_joint';
    payload: JointModel;
} | {
    type: 'chunk_remove_joint';
    payload: string;
} | {
    type: 'chunk_update_field';
    payload: {
        key: keyof ChunkModel;
        value: any;
    }
};

export function chunkReducer(
    state: ChunkModel,
    action: ChunkReducerActions
): ChunkModel {
    switch (action.type) {
        case 'chunk_update_field':
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
        case 'chunk_add_element':
        case 'chunk_update_element':
            const element = action.payload;

            return {
                ...state,
                elements: {
                    ...state.elements,
                    [element.id]: element,
                }
            }
        case 'chunk_reorder_elements':
            const elementIds = action.payload as ElementID[];
            const reorderedElements: {[key: ElementID]: ElementModel} = {};

            elementIds.forEach(id => {
                if (!state.elements[id]) {
                    throw new Error(`Reorder element ID ${id} not found in state`);
                }
                reorderedElements[id] = state.elements[id];
            })

            if (Object.keys(reorderedElements).length !== Object.keys(state.elements).length) {
                throw new Error('Reorder element IDs do not match original elements count');
            }

            return {
                ...state,
                elements: reorderedElements,
            }
        case 'chunk_remove_element':
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
        case 'chunk_add_joint':
        case 'chunk_update_joint':
            const joint = action.payload;

            return {
                ...state,
                joints: {
                    ...state.joints,
                    [joint.id]: joint,
                }
            }
        case 'chunk_remove_joint':
            const removedJointId = action.payload;

            const updatedJoints = Object.fromEntries(
                Object.entries(state.joints).filter(([id]) => id !== removedJointId)
            );

            return {
                ...state,
                joints: updatedJoints,
            }
        default:
            throw new Error('Invalid action type');
    }
}