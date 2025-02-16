import {ChunkModel} from "../../model/ChunkModel";
import React from "react";
import {SingleObjectEditor} from "../SingleObjectEditor";
import {BaseTab} from "./BaseTab";
import {ChunkReducerActions} from "../reducer/chunkReducer";

export type EditGeneralTabProps = {
    chunk: ChunkModel;
    chunkDispatcher: React.Dispatch<ChunkReducerActions>;
}

export function EditGeneralTab(props: EditGeneralTabProps) {
    const updateField = (key: string, value: any) => {
        props.chunkDispatcher({
            type: 'chunk_update_field',
            payload: {
                key: key,
                value: value,
            }
        })
    }

    return (
        <BaseTab
            title={"General"}
            description={"Edit the general information of the chunk."}
        >
            <ul>
                {Object.entries(props.chunk)
                    .filter(([_, value]) => !(value instanceof Array))
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
