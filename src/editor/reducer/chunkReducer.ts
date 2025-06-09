import {ChunkModel} from "../../model/ChunkModel";
import {ElementModel} from "../../model/ElementModel";
import {JointModel} from "../../model/JointModel";
import {ChunkBuilder} from "../../model/builder/ChunkBuilder";
import {ElementBuilder} from "../../model/builder/ElementBuilder";
import {JointBuilder} from "../../model/builder/JointBuilder";

export type ChunkReducerActions = {
    type: 'chunk_add_element';
    payload: ElementModel;
} | {
    type: 'chunk_update_element';
    payload: ElementModel;
} | {
    type: 'chunk_remove_element';
    payload: string;
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
            if (!(action.payload.key in state)) {
                throw new Error(`Invalid field key: ${action.payload.key}`);
            }
            if (['elements', 'joints'].includes(action.payload.key)) {
                throw new Error('Use dedicated actions for elements and joints');
            }
            return ChunkBuilder
                .from(state)
                .with(action.payload.key, action.payload.value)
                .build()
            ;
        case 'chunk_add_element':
        case 'chunk_update_element':
            return ChunkBuilder
                .from(state)
                .withElement(ElementBuilder.from(action.payload).build())
                .build()
            ;
        case 'chunk_remove_element':
            return ChunkBuilder
                .from(state)
                .withoutElement(action.payload)
                .build()
            ;
        case 'chunk_add_joint':
        case 'chunk_update_joint':
            return ChunkBuilder
                .from(state)
                .withJoint(JointBuilder.from(action.payload).build())
                .build()
            ;

        case 'chunk_remove_joint':
            return ChunkBuilder
                .from(state)
                .withoutJoint(action.payload)
                .build()
            ;
        default:
            throw new Error('Invalid action type');
    }
}