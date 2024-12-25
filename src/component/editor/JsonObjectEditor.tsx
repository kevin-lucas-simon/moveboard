import {JsonNestedEditor} from "./JsonNestedEditor";
import React from "react";

export type JsonObjectEditorProps = {
    keyName: string,
    displayname?: string,
    value: any,
    onChange: (key: string, value: any) => void,
    onDelete: (key: string) => void,
}

export function JsonObjectEditor(props: JsonObjectEditorProps) {
    return (
        <>
            <li className="mt-4">
                <JsonNestedEditor
                    keyName={props.keyName}
                    value={props.value}
                    onKeyValueChange={props.onChange}
                />
                <button
                    className="bg-gray-600"
                    onClick={() => props.onDelete(props.keyName)}
                >
                    Delete
                </button>
            </li>
        </>
    );
}
