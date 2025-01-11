import {Button} from "@headlessui/react";
import React from "react";

export type BasicButtonProps = {
    type: "primary" | "secondary",
    onClick: (() => void) | undefined,
    children: React.ReactNode,
}
export function BasicButton(props: BasicButtonProps) {
    if (props.type === "primary") {
        return (
            <Button
                onClick={props.onClick}
                className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm text-white bg-gray-700 hover:bg-gray-600 open:bg-gray-700"
            >
                {props.children}
            </Button>
        );
    }

    if (props.type === "secondary") {
        return (
            <Button
                onClick={props.onClick}
                className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm bg-gray-200 hover:bg-gray-300 open:bg-gray-200"
            >
                {props.children}
            </Button>
        );
    }

    return (
        <div>Type not supported</div>
    );
}
