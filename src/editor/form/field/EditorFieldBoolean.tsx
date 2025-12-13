import {EditorFieldType} from "../EditorFieldType";
import {Switch} from "@headlessui/react";
import clsx from "clsx";

export function EditorFieldBoolean(props: EditorFieldType<boolean>) {
    return (
        <Switch
            checked={props.value}
            onChange={e => props.onChange(e)}
            className={clsx(
                "group relative flex h-5 w-9 cursor-pointer rounded-full bg-gray-500/25 p-1 place-self-center",
                "transition-colors duration-200 ease-in-out focus:outline-none",
                "data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-green-500/50",
                props.className ?? ''
            )}
        >
            <span
                aria-hidden="true"
                className={clsx(
                    "pointer-events-none inline-block size-3 translate-x-0 rounded-full bg-gray-50 ring-0 shadow-lg",
                    "transition duration-200 ease-in-out ",
                    "group-data-[checked]:translate-x-4"
                )}
            />
            <span className="absolute -top-0.5 left-11">
                {props.value ? "True" : "False"}
            </span>
        </Switch>
    );
}
