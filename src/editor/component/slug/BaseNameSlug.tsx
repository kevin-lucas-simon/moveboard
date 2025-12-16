import React from "react";

export function BaseNameSlug(props: {
    children: React.ReactNode
}) {
    return (
        <button className="w-0 grow truncate text-left">
            {props.children}
        </button>
    );
}
