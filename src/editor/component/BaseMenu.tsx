import React, {useState} from "react";
import {Menu, MenuButton, MenuItems} from "@headlessui/react";
import {BasicDropdownItem} from "../../component/dropdown/BasicDropdownItem";
import {EditorDialogProps} from "../dialog/EditorDialogProps";

export type BaseMenuDialogs = {[key: string]: React.ComponentType<EditorDialogProps>|React.ReactElement<EditorDialogProps>}
export type BaseMenuProps = {
    className?: string,
    dialogs: BaseMenuDialogs,
    children: React.ReactNode,
}

export function BaseMenu(props: BaseMenuProps) {
    const [activeDialog, setActiveDialog] = useState<string|null>(null);

    return (
        <>
            <Menu as={"div"} className="relative">
                <MenuButton className={props.className}>
                    {props.children}
                </MenuButton>

                <MenuItems className="absolute left-0 z-20 mt-3 w-56 text-nowrap origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden drop-shadow-xl">
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

            {activeDialog && typeof props.dialogs[activeDialog] === "function" &&
                React.createElement(
                    props.dialogs[activeDialog] as React.ComponentType<EditorDialogProps>,
                    {
                        onClose: () => setActiveDialog(null),
                    }
                )
            }

            {activeDialog && React.isValidElement(props.dialogs[activeDialog]) &&
                React.cloneElement(
                    props.dialogs[activeDialog] as React.ReactElement<EditorDialogProps>,
                    {
                        onClose: () => setActiveDialog(null),
                    }
                )
            }
        </>
    );
}