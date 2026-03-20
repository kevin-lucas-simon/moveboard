import clsx from "clsx";
import React from "react";

export function BaseListItem(props: {
    children: React.ReactNode;
    recursiveChildren?: React.ReactNode;
    isSelected?: boolean;
    isHidden?: boolean;
    onClick?: () => void;
}) {
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (props.onClick) {
            props.onClick();
        }
    } ;

    return (
        <li className={clsx(
            props.isSelected && "bg-gray-500/10",
            props.isHidden && "text-gray-500/50"
        )}>
            <div
                onClick={onClick}
                className="h-9 flex group hover:bg-gray-500/10 pl-4 p-2.5 items-center"
            >
                <div className="grow flex gap-2">
                    {props.children}
                </div>
            </div>
            {props.recursiveChildren}
        </li>
    );
}
