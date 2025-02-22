import {ChunkModel} from "../../model/ChunkModel";
import {ElementModel} from "../../model/ElementModel";
import {JointModel} from "../../model/JointModel";

export type ChunkReducerActions = {
    type: 'chunk_add_element';
    payload: ElementModel;
} | {
    type: 'chunk_update_element';
    payload: {
        index: string;
        element: ElementModel;
    }
} | {
    type: 'chunk_remove_element';
    payload: string;
} | {
    type: 'chunk_add_joint';
    payload: JointModel;
} | {
    type: 'chunk_update_joint';
    payload: {
        index: string;
        joint: JointModel;
    }
} | {
    type: 'chunk_remove_joint';
    payload: string;
} | {
    type: 'chunk_update_field';
    payload: {
        key: string;
        value: any;
    }
};

export function chunkReducer(
    state: ChunkModel,
    action: ChunkReducerActions
): ChunkModel {
    switch (action.type) {
        case 'chunk_update_field':
            if (['elements', 'joints'].includes(action.payload.key)) {
                throw new Error('Use dedicated actions for elements and joints');
            }
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            }
        case 'chunk_add_element':
            return {
                ...state,
                elements: [
                    ...state.elements,
                    action.payload,
                ]
            }
        case 'chunk_update_element':
            return {
                ...state,
                elements: state.elements.map((el, i) => i !== parseInt(action.payload.index) ? el : action.payload.element)
            }
        case 'chunk_remove_element':
            return {
                ...state,
                elements: state.elements.filter((e, i) => i !== parseInt(action.payload))
            }
        case 'chunk_add_joint':
            // TODO hier könnte ich validatoren einbauen, die prüfen, ob die joints gültig sind
            // TODO vlt könnte ich das eine Ebene höher machen, damit ich die Joints auch zwischen den Chunks prüfen kann
            return {
                ...state,
                joints: [
                    ...state.joints,
                    action.payload,
                ]
            }
        case 'chunk_update_joint':
            return {
                ...state,
                joints: state.joints.map((el, i) => i !== parseInt(action.payload.index) ? el : action.payload.joint)
            }
        case 'chunk_remove_joint':
            return {
                ...state,
                joints: state.joints.filter((e, i) => i !== parseInt(action.payload))
            }
        default:
            throw new Error('Invalid action type');
    }
}