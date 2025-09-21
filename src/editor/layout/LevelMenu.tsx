import {BasicDropdownItem} from "../../component/dropdown/BasicDropdownItem";
import {BasicDropdownDivider} from "../../component/dropdown/BasicDropdownDivider";
import React, {useState} from "react";
import {LevelReducerActions} from "../reducer/levelReducer";
import {LevelModel} from "../../data/model/world/LevelModel";
import {ExportChangesDialog} from "../dialog/ExportChangesDialog";
import {ClearChangesDialog} from "../dialog/ClearChangesDialog";
import {LevelSettingsDialog} from "../dialog/LevelSettingsDialog";
import {Menu, MenuButton, MenuItems} from "@headlessui/react";

export type LevelMenuProps = {
    button: React.ReactNode|string;
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
            <Menu as={"div"} className="relative">
                <MenuButton className="h-8 flex items-center gap-2 rounded-lg hover:bg-gray-500/10 -my-2.5 px-3 py-5">
                    {props.button}
                </MenuButton>

                <MenuItems className="absolute left-0 z-20 mt-4 w-56 text-nowrap origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden drop-shadow-xl">
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
                </MenuItems>
            </Menu>

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
