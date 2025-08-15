import {ChunkModel} from "../../data/model/world/ChunkModel";
import React from "react";
import {LevelReducerActions} from "../reducer/levelReducer";
import {BaseTab} from "../tabs/BaseTab";
import {SingleObjectEditor} from "../input/SingleObjectEditor";

export type EditorChunkInspectorProps = {
    chunk: ChunkModel;
    dispatcher: React.Dispatch<LevelReducerActions>;
}

export function EditorChunkInspector(props: EditorChunkInspectorProps) {
    const updateField = (key: string, value: any) => {
        props.dispatcher({
            type: 'chunk_update_field',
            payload: {
                key: key as keyof ChunkModel,
                value: value,
            }
        })
    }

    return (
        <BaseTab title={props.chunk.name}>
            <ul>
                {Object.entries(props.chunk)
                    .filter(([key, _]) => !['elements', 'joints'].includes(key))
                    .map(([key, value]) => {
                        return (
                            <SingleObjectEditor key={key} keyName={key} value={value} onChange={updateField}/>
                        )
                    })
                }
            </ul>
        </BaseTab>
    );
}
