import {Switch} from "@headlessui/react";
import clsx from "clsx";
import {JsonSelectionEditor} from "./JsonSelectionEditor";
import {UUID} from "../../data/model/shared/UUID";

export type JsonFieldEditorProps = {
    value: any,
    onChange: (value: any) => void,
    className?: string,
    selection?: {[id: UUID]: string},
}

export function JsonFieldEditor(props: JsonFieldEditorProps) {
    if (props.selection) {
        return (
            <JsonSelectionEditor
                value={props.value}
                onChange={props.onChange}
                options={props.selection}
            />
        );
    }

    if (typeof props.value === "string") {
        return (
            <input
                type={"text"}
                value={props.value}
                placeholder={"Type..."}
                onChange={e => props.onChange(e.target.value)}
                className={props.className}
            />
        );
    }

    if (typeof props.value === "number") {
        return (
            <input
                type={"number"}
                value={props.value}
                onChange={e => {
                    if (isNaN(e.target.valueAsNumber)) {
                        return;
                    }
                    props.onChange(e.target.valueAsNumber);
                }}
                className={props.className}
            />
        );
    }

    if (typeof props.value === "boolean") {
        return (
            <Switch
                checked={props.value}
                onChange={e => props.onChange(e)}
                className={clsx(
                    "group relative flex h-5 w-9 cursor-pointer rounded-full bg-gray-500/25 p-1 place-self-center",
                    "transition-colors duration-200 ease-in-out focus:outline-none",
                    "data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-gray-500/15",
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
            </Switch>
        );
    }

    console.warn(JsonFieldEditor.name + ": Unsupported value type ", typeof props.value);

    return (
        <span className={props.className}>
            ??
        </span>
    );
}
