import React, {ReactNode} from "react";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {Menu, MenuButton, MenuItems} from "@headlessui/react";
import {BasicDropdownItem} from "../../component/dropdown/BasicDropdownItem";

export type BasePanelProps = {
    children?: React.ReactNode;
    title: string;
    description?: string;
    addOptions?: string[];
    onAction?: (selected?: string) => void;
    actionIcon?: ReactNode|null,
    className?: string;
}
export function BasePanel(props: BasePanelProps) {
    const onAddSingle = () => {
        if (!props.addOptions && props.onAction) {
            props.onAction();
        }
    }

    const onAddMultiple = (selected: string) => {
        if (props.addOptions && props.onAction) {
            props.onAction(selected);
        }
    }

    return (
        <div className={"w-full h-full flex flex-col " + props.className}>
            <div className="pt-4 px-4 flex justify-between">
                <h2 className="text-xl font-semibold truncate">{props.title}</h2>
                {(props.addOptions || props.onAction || props.actionIcon) &&
                    <Menu>
                        <MenuButton
                            className="relative hover:bg-gray-500/15 p-1 -mr-1.5 rounded-full"
                            onClick={onAddSingle}
                        >
                            {props.actionIcon ?? <PlusCircleIcon className="h-6"/>}
                        </MenuButton>
                        <MenuItems anchor="bottom end" className="mt-0.5 rounded-md bg-white shadow-xl ring-1 ring-black/5">
                            {props.addOptions?.map((option, index) =>
                                <BasicDropdownItem key={index} onClick={() => onAddMultiple(option)}>
                                    {option}
                                </BasicDropdownItem>
                            )}
                        </MenuItems>
                    </Menu>
                }
            </div>
            <div className="grow h-0 overflow-y-auto">
                {props.description &&
                    <p className="text-sm px-4 py-2">
                        {props.description}
                    </p>
                }
                {props.children}
            </div>
        </div>
    );
}
