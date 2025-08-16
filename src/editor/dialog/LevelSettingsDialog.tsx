import {LevelModel} from "../../data/model/world/LevelModel";
import {LevelReducerActions} from "../reducer/levelReducer";
import React from "react";
import {BasicDialog} from "../../component/dialog/BasicDialog";

export type LevelSettingsDialogProps = {
    onClose: () => void;
    level: LevelModel;
    levelDispatcher: React.Dispatch<LevelReducerActions>;
}

export function LevelSettingsDialog(props: LevelSettingsDialogProps) {
    const [levelName, setLevelName] = React.useState<string>(props.level.name);

    const handleLevelUpdate = () => {
        // Prevent empty names
        if (levelName.trim() === "") {
            return;
        }

        props.levelDispatcher({
            type: 'level_update_field',
            payload: {
                key: 'name',
                value: levelName,
            }
        })

        props.onClose();
        setLevelName("");
    }

    return (
        <BasicDialog
            isOpen={true}
            title={"Level Settings"}
            onClose={props.onClose}
            submitButton={"Save Settings"}
            onSubmit={handleLevelUpdate}
        >
            <input
                type="text"
                value={levelName}
                onChange={e => setLevelName(e.target.value)}
                className="w-full p-2 border border-gray-300 bg-transparent rounded"
                placeholder="Level Name"
            />
        </BasicDialog>
    );
}
