import {ChunkModel} from "../../../experience/world/model/ChunkModel";
import React from "react";
import {SingleObjectEditor} from "../SingleObjectEditor";

export type ChunkGeneralEditorProps = {
    chunk: ChunkModel;
    onChunkChange: (chunk: ChunkModel) => void;
}

export function EditorGeneralTab(props: ChunkGeneralEditorProps) {
    const handleChangedChunk = (key: string, value: any) => {
        props.onChunkChange({
            ...props.chunk,
            [key]: value,
        });
    }

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-xl pt-4 px-4">General</h2>
            <div className="grow h-0 overflow-y-auto">
                <p className="text-sm px-4 py-2">
                    Edit the general information of the chunk.
                </p>
                <ul>
                    {Object.entries(props.chunk).map(([key, value]) => {
                        if (value instanceof Array) {
                            return <></>;
                        }
                        return (
                            <SingleObjectEditor keyName={key} value={value} onChange={handleChangedChunk}/>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}
