import React from "react";
import {Menu, MenuButton, MenuItems} from "@headlessui/react";

type BasicDropdownProps = {
    button: React.ReactNode|string;
    children: React.ReactNode;
}

export function BasicDropdown(props: BasicDropdownProps) {
    return (
        <Menu as={"div"} className="relative">
            <MenuButton className="h-8 flex items-center gap-2 rounded-xl hover:bg-gray-500/10 -my-2 px-3 py-4">
                {props.button}
            </MenuButton>

            <MenuItems className="absolute right-0 z-10 mt-4 max-w-56 text-nowrap origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden drop-shadow-xl">
                {props.children}
            </MenuItems>
        </Menu>
    );
}