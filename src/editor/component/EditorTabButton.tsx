import React from "react";

export type TabButtonProps = {
    active?: boolean,
    children?: React.ReactNode | undefined,
    onClick?: () => void,
}

export function EditorTabButton(props: TabButtonProps) {
    return (
        <button
            className={`w-8 h-8 p-1 rounded hover:bg-gray-500/10 ${props.active ? "bg-gray-500/20 hover:bg-gray-500/25" : ""}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
