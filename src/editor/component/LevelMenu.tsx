import {Bars3Icon} from "@heroicons/react/24/outline";
import {BasicDropdownItem} from "../../component/dropdown/BasicDropdownItem";
import {BasicDropdownDivider} from "../../component/dropdown/BasicDropdownDivider";
import {BasicDropdown} from "../../component/dropdown/BasicDropdown";
import React, {useState} from "react";
import {BasicDialog} from "../../component/dialog/BasicDialog";
import {Textarea} from "@headlessui/react";
import {LevelReducerActions} from "../reducer/levelReducer";
import {LevelModel} from "../../data/model/world/LevelModel";

export type LevelMenuProps = {
    level: LevelModel;
    levelDispatcher: React.Dispatch<LevelReducerActions>;
}

enum EditorDialogs {
    LEVEL_EXPORT = "level_export",
    LEVEL_CHANGES_CLEAR = "level_changes_clear",
}

export function LevelMenu(props: LevelMenuProps) {
    const [dialog, setDialog] = useState<EditorDialogs|null>(null);

    const handleLevelReset = () => {
        props.levelDispatcher({
            type: 'level_reset',
            payload: props.level,
        });
    }

    return (
        <>
            <BasicDropdown button={<>
                {props.level.name}
                <Bars3Icon className="h-6"/>
            </>}>
                <div>
                    <BasicDropdownItem onClick={() => setDialog(EditorDialogs.LEVEL_EXPORT)}>
                        Export Level
                    </BasicDropdownItem>
                    <BasicDropdownItem onClick={() => setDialog(EditorDialogs.LEVEL_CHANGES_CLEAR)}>
                        Clear Changes
                    </BasicDropdownItem>
                </div>
                <BasicDropdownDivider/>
                <div>
                    <BasicDropdownItem href={"/"}>Leave Editor</BasicDropdownItem>
                </div>
            </BasicDropdown>

            {/* export dialog */}
            <BasicDialog
                title="Export Level"
                isOpen={dialog === EditorDialogs.LEVEL_EXPORT}
                onClose={() => setDialog(null)}
            >
                <div>Export the JSON data of the current edited level.</div>
                <Textarea
                    className="w-full h-32 p-2 bg-gray-500/5 rounded-md text-xs"
                    value={JSON.stringify(props.level)}
                    readOnly
                />
            </BasicDialog>

            {/* clear dialog */}
            <BasicDialog
                title={"Clear Changes"}
                isOpen={dialog === EditorDialogs.LEVEL_CHANGES_CLEAR}
                onClose={() => setDialog(null)}
                submitButton={"Clear Changes"}
                onSubmit={() => {
                    setDialog(null);
                    handleLevelReset();
                }}
            >
                Do you really want to clear all changes? All unsaved changes will be lost.
            </BasicDialog>
        </>
    );
}
