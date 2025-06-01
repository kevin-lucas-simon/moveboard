import React from "react";

export type LinkButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
}

export function LinkButton(props: LinkButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className="flex gap-1 px-2 py-1 hover:bg-gray-500/10 rounded-full text-sm"
        >
            {props.children}
        </button>
    );
}
