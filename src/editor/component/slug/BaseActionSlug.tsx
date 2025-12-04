import React from "react";

export type BaseActionSlugProps = {
    onClick: () => void;
    children: React.ReactNode;
}

export function BaseActionSlug(props: BaseActionSlugProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        props.onClick();
    }

    return (
        <button onClick={handleClick} className="p-2 rounded-full hidden group-hover:block hover:bg-gray-500/10">
            {props.children}
        </button>
    );
}
