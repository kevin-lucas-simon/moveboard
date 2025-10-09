import {BasicDropdownItem} from "../../../component/dropdown/BasicDropdownItem";
import React, {useState} from "react";
import {Menu, MenuButton, MenuItems} from "@headlessui/react";
import {MoveBoardLogo} from "../../../component/asset/MoveBoardLogo";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {EditorDialogProps} from "../../dialog/EditorDialogProps";

export type LevelMenuProps = {
    collapsed: boolean,
    dialogs: {[key: string]: React.ComponentType<EditorDialogProps>},
}

export function EditorDropdownMenu(props: LevelMenuProps) {
    const [activeDialog, setActiveDialog] = useState<string|null>(null);

    return (
        <>
            <Menu as={"div"} className="relative">
                <MenuButton className="h-8 flex items-center gap-2 rounded-lg hover:bg-gray-500/10 -my-2.5 px-3 py-5">
                    <MoveBoardLogo />
                    {!props.collapsed && <>
                        <div className="text-2xl font-semibold ml-1">Moveboard</div>
                        <ChevronDownIcon className="w-6 mt-1"/>
                    </>}
                </MenuButton>

                <MenuItems className="absolute left-0 z-20 mt-4 w-56 text-nowrap origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden drop-shadow-xl">
                    <div>
                        {Object.keys(props.dialogs).map(key => (
                            <BasicDropdownItem
                                onClick={() => setActiveDialog(key)}
                                key={key}
                            >
                                {key}
                            </BasicDropdownItem>
                        ))}
                    </div>
                </MenuItems>
            </Menu>

            {activeDialog && React.createElement(props.dialogs[activeDialog], {
                onClose: () => setActiveDialog(null),
            })}
        </>
    );
}
