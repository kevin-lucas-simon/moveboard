import {ChunkModel} from "../../experience/world/model/ChunkModel";
import React from "react";
import {SingleObjectEditor} from "../SingleObjectEditor";
import {BaseTab} from "./BaseTab";

export type EditGeneralTabProps = {
    chunk: ChunkModel;
    onChunkChange: (chunk: ChunkModel) => void;
}

export function EditGeneralTab(props: EditGeneralTabProps) {
    const handleChangedChunk = (key: string, value: any) => {
        props.onChunkChange({
            ...props.chunk,
            [key]: value,
        });
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
                            <SingleObjectEditor key={key} keyName={key} value={value} onChange={handleChangedChunk}/>
                        )
                    })
                }
            </ul>
        </BaseTab>
    );
}
