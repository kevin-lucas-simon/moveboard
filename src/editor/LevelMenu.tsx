import {Bars3Icon} from "@heroicons/react/24/outline";
import {BasicDropdownItem} from "../component/dropdown/BasicDropdownItem";
import {BasicDropdownDivider} from "../component/dropdown/BasicDropdownDivider";
import {BasicDropdown} from "../component/dropdown/BasicDropdown";
import React, {useState} from "react";
import {LevelReducerActions} from "./reducer/levelReducer";
import {LevelModel} from "../data/model/world/LevelModel";
import {ExportChangesDialog} from "./dialog/ExportChangesDialog";
import {ClearChangesDialog} from "./dialog/ClearChangesDialog";
import {LevelSettingsDialog} from "./dialog/LevelSettingsDialog";

export type LevelMenuProps = {
    level: LevelModel;
    levelDispatcher: React.Dispatch<LevelReducerActions>;
}

enum EditorDialogs {
    Level_SETTINGS = "level_settings",
    LEVEL_EXPORT = "level_export",
    LEVEL_CHANGES_CLEAR = "level_changes_clear",
}

export function LevelMenu(props: LevelMenuProps) {
    const [dialog, setDialog] = useState<EditorDialogs|null>(null);

    return (
        <>
            <BasicDropdown button={<>
                {props.level.name}
                <Bars3Icon className="h-6"/>
            </>}>
                <div>
                    <BasicDropdownItem onClick={() => setDialog(EditorDialogs.Level_SETTINGS)}>
                        Level Settings
                    </BasicDropdownItem>
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

            {dialog === EditorDialogs.Level_SETTINGS &&
                <LevelSettingsDialog
                    onClose={() => setDialog(null)}
                    level={props.level}
                    levelDispatcher={props.levelDispatcher}
                />
            }
            {dialog === EditorDialogs.LEVEL_CHANGES_CLEAR &&
                <ClearChangesDialog
                    onClose={() => setDialog(null)}
                    level={props.level}
                    levelDispatcher={props.levelDispatcher}
                />
            }
            {dialog === EditorDialogs.LEVEL_EXPORT &&
                <ExportChangesDialog
                    onClose={() => setDialog(null)}
                    level={props.level}
                />
            }
        </>
    );
}
