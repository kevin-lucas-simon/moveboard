import React from "react";
import clsx from "clsx";

export type BaseActionSlugProps = {
    onClick: () => void;
    children: React.ReactNode;
    hide?: boolean;
}

export function BaseActionSlug(props: BaseActionSlugProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        props.onClick();
    }

    return (
        <button
            onClick={handleClick}
            className={clsx(
                "p-2 rounded-full hover:bg-gray-500/10",
                props.hide && "hidden group-hover:block"
            )}>
            {props.children}
        </button>
    );
}
