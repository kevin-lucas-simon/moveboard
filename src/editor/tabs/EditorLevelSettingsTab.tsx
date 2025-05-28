import {BaseTab} from "./BaseTab";
import {LevelModel} from "../../model/LevelModel";
import {SingleObjectEditor} from "../input/SingleObjectEditor";
import {LevelReducerActions} from "../reducer/levelReducer";
import React from "react";

export type EditorLevelSettingsTabProps = {
    level: LevelModel,
    levelDispatcher: React.Dispatch<LevelReducerActions>,
}

export function EditorLevelSettingsTab(props: EditorLevelSettingsTabProps) {
    const handleUpdateField = (key: string, value: any) => {
        props.levelDispatcher({
            type: 'level_update_field',
            payload: {
                key: key,
                value: value,
            }
        });
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
                TODO here add new chunk!
            </ul>
        </BaseTab>
    );
}
