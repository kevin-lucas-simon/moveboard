import React, {ReactNode} from "react";

export type BasicDropdownItemProps = {
    href?: string|undefined;
    onClick?: () => void;
    children: ReactNode;
}
export function BasicDropdownItem(props: BasicDropdownItemProps) {
    return (
        <div>
            {props.href ? (
                <a
                    href={props.href}
                    onClick={props.onClick}
                    className="block w-full px-4 py-2 first:pt-3 last:pb-3 text-sm text-left hover:bg-gray-100"
                >
                    {props.children}
                </a>
            ) : (
                <button
                    onClick={props.onClick}
                    className="block w-full px-4 py-2 first:pt-3 last:pb-3 text-sm text-left hover:bg-gray-100"
                >
                    {props.children}
                </button>
            )}
        </div>
    );
}