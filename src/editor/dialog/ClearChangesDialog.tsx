import {BasicDialog} from "../../component/dialog/BasicDialog";
import React from "react";
import {LevelReducerActions} from "../reducer/levelReducer";
import {LevelModel} from "../../data/model/world/LevelModel";

export type ClearChangesDialogProps = {
    onClose: () => void;
    level: LevelModel;
    levelDispatcher: React.Dispatch<LevelReducerActions>;
}

export function ClearChangesDialog(props: ClearChangesDialogProps) {
    const handleLevelReset = () => {
        props.levelDispatcher({
            type: 'level_reset',
            payload: props.level,
        });
        props.onClose();
    }

    return (
        <BasicDialog
            title={"Clear Changes"}
            isOpen={true}
            onClose={props.onClose}
            submitButton={"Clear Changes"}
            onSubmit={handleLevelReset}
        >
            Do you really want to clear all changes? All unsaved changes will be lost.
        </BasicDialog>
    );
}
