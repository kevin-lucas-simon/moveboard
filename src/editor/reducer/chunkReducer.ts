import {ChunkModel} from "../../model/ChunkModel";
import {ElementModel} from "../../model/ElementModel";
import {JointModel} from "../../model/JointModel";
import {ChunkBuilder} from "../../model/builder/ChunkBuilder";
import {ElementBuilder} from "../../model/builder/ElementBuilder";

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
            return ChunkBuilder
                .from(state)
                .addElement(ElementBuilder.from(action.payload).build())
                .build()
            ;
        case 'chunk_update_element':
            return ChunkBuilder
                .from(state)
                .editElement(action.payload.index, (builder) => {
                    return builder.patch(action.payload.element);
                })
                .build()
            ;
        case 'chunk_remove_element':
            return ChunkBuilder
                .from(state)
                .removeElement(action.payload)
                .build()
            ;
        case 'chunk_add_joint':
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