import React from "react";
import {BasicDialog} from "../../component/dialog/BasicDialog";
import {useEditorDispatcher, useEditorLevel} from "../reducer/EditorProvider";
import {EditorDialogProps} from "./EditorDialogProps";

export function LevelSettingsDialog(props: EditorDialogProps) {
    const dispatcher = useEditorDispatcher();
    const level = useEditorLevel();

    const [levelName, setLevelName] = React.useState<string>(level?.name ?? "Unnamed level");

    if (!level || !dispatcher) {
        return <></>
    }

    const handleLevelUpdate = () => {
        // Prevent empty names
        if (levelName.trim() === "") {
            return;
        }

        dispatcher({
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
