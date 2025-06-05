import {BaseTab} from "./BaseTab";
import {LevelModel} from "../../model/LevelModel";
import {SingleObjectEditor} from "../input/SingleObjectEditor";
import {LevelReducerActions} from "../reducer/levelReducer";
import React from "react";
import {LinkButton} from "../../component/button/LinkButton";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {CreateChunkDialog} from "../dialog/CreateChunkDialog";

export type EditorLevelSettingsTabProps = {
    level: LevelModel,
    levelDispatcher: React.Dispatch<LevelReducerActions>,
}

enum EditorDialogs {
    CHUNK_CREATE = "chunk_create",
}

export function EditorLevelSettingsTab(props: EditorLevelSettingsTabProps) {
    const [dialog, setDialog] = React.useState<EditorDialogs|null>(null);

    const handleUpdateField = (key: string, value: any) => {
        props.levelDispatcher({
            type: 'level_update_field',
            payload: {
                key: key,
                value: value,
            }
        });
        if (key === 'start') {
            props.levelDispatcher({
                type: 'level_select_chunk',
                payload: value,
            })
        }
    }

    const handleCreateChunk = (name: string) => {
        props.levelDispatcher({
            type: 'level_add_chunk',
            payload: name,
        });
        setDialog(null);
    }

    return (
        <BaseTab
            title={"Level Settings"}
            description={"Edit the general information of the level."}
        >
            <ul>
                {Object.entries(props.level)
                    .filter(([_, value]) => !(value instanceof Array))
                    .filter(([key, _]) => !['chunks'].includes(key))
                    .map(([key, value]) => {
                        return (
                            <SingleObjectEditor
                                key={key}
                                keyName={key}
                                value={value}
                                onChange={handleUpdateField}
                                selectionOnKey={{
                                    "start": Object.keys(props.level.chunks),
                                }}
                            />
                        )
                    })
                }
                <li className="mx-2 mt-2">
                    <LinkButton onClick={() => setDialog(EditorDialogs.CHUNK_CREATE)}>
                        <PlusCircleIcon className="w-4"/>
                        Create new Chunk
                    </LinkButton>
                    <CreateChunkDialog
                        isOpen={dialog === EditorDialogs.CHUNK_CREATE}
                        existingChunkNames={Object.keys(props.level.chunks)}
                        onSubmit={handleCreateChunk}
                        onClose={() => setDialog(null)}
                    />
                </li>
            </ul>
        </BaseTab>
    );
}
