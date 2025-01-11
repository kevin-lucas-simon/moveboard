import {Bars3Icon} from "@heroicons/react/24/outline";
import React from "react";
import {Menu, MenuButton, MenuItems} from "@headlessui/react";

type EditorNavigationMenuProps = {
    children: React.ReactNode;
}

export function EditorMenu(props: EditorNavigationMenuProps) {
    return (
        <Menu as={"div"} className="relative">
            <MenuButton className="h-8 flex items-center gap-1 rounded hover:bg-gray-500/10 p-2">
                <Bars3Icon className="h-6"/>
            </MenuButton>

            <MenuItems className="absolute right-0 z-10 mt-2 max-w-56 text-nowrap origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
                {props.children}
            </MenuItems>
        </Menu>
    );
}