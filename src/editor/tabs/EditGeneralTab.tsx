import {ChunkModel} from "../../model/ChunkModel";
import React from "react";
import {SingleObjectEditor} from "../input/SingleObjectEditor";
import {BaseTab} from "./BaseTab";
import {LinkButton} from "../../component/button/LinkButton";
import {LevelReducerActions} from "../reducer/levelReducer";
import {BasicDialog} from "../../component/dialog/BasicDialog";
import {TrashIcon} from "@heroicons/react/24/outline";

export type EditGeneralTabProps = {
    chunk: ChunkModel;
    startChunk: string;
    currentChunk: string;
    levelDispatcher: React.Dispatch<LevelReducerActions>;
}
enum EditorDialogs {
    LEVEL_DELETE = "level_delete",
}

export function EditGeneralTab(props: EditGeneralTabProps) {
    const [dialog, setDialog] = React.useState<EditorDialogs|null>(null);

    const updateField = (key: string, value: any) => {
        props.levelDispatcher({
            type: 'chunk_update_field',
            payload: {
                key: key,
                value: value,
            }
        })
    }

    const removeChunk = () => {
        setDialog(null);
        props.levelDispatcher({
            type: 'level_remove_chunk',
            payload: props.chunk.name,
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
                            <SingleObjectEditor key={key} keyName={key} value={value} onChange={updateField}/>
                        )
                    })
                }
                <li className="mx-2">
                    {props.currentChunk !== props.startChunk &&
                        <LinkButton onClick={() => setDialog(EditorDialogs.LEVEL_DELETE)}>
                            <TrashIcon className="w-4"/>
                            Delete Chunk
                        </LinkButton>
                    }
                    {dialog === EditorDialogs.LEVEL_DELETE &&
                        <BasicDialog
                            title={"Delete Chunk"}
                            isOpen={dialog === EditorDialogs.LEVEL_DELETE}
                            onClose={() => setDialog(null)}
                            submitButton={"Delete Chunk"}
                            onSubmit={() => removeChunk()}
                        >
                            Do you really want to delete the chunk <strong>{props.chunk.name}</strong>? This action cannot be undone.
                        </BasicDialog>
                    }
                </li>
            </ul>
        </BaseTab>
    );
}
