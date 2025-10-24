import React, {useState} from "react";
import {Menu, MenuButton, MenuItems} from "@headlessui/react";
import {BasicDropdownItem} from "../../component/dropdown/BasicDropdownItem";
import {EditorDialogProps} from "../dialog/EditorDialogProps";

export type BaseMenuProps = {
    className?: string,
    dialogs: {[key: string]: React.ComponentType<EditorDialogProps>},
    // dialogs: {[key: string]: React.ReactElement<Partial<EditorDialogProps> & Record<string, any>>, // TODO JSX Komponente direkt um Zusatzprops zu erlauben
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

            {activeDialog && React.createElement(props.dialogs[activeDialog], {
                onClose: () => setActiveDialog(null),
            })}
        </>
    );
}