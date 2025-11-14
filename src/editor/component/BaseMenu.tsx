import React, {useState} from "react";
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react";
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
            <Popover className="relative">
                <PopoverButton className={props.className}>
                    {props.children}
                </PopoverButton>
                <PopoverPanel
                    anchor="bottom start"
                    className="z-20 w-56 mt-2 rounded-xl bg-white shadow-lg drop-shadow-xl text-nowrap ring-1 ring-black/5 overflow-hidden"
                >
                    {Object.keys(props.dialogs).map(key => (
                        <BasicDropdownItem
                            onClick={() => setActiveDialog(key)}
                            key={key}
                        >
                            {key}
                        </BasicDropdownItem>
                    ))}
                </PopoverPanel>
            </Popover>

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