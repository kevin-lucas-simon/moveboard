import {JsonNestedEditor} from "./JsonNestedEditor";
import React from "react";
import {JsonSingleFieldEditor} from "./JsonSingleFieldEditor";
import {UUID} from "../../model/util/UUID";
import {editorConfig} from "../../config/editorConfig";

export type SingleObjectEditorProps = {
    keyName: string,
    value: any,
    onChange: (key: string, value: any) => void,
    selectionOnKey?: {[key: string]: {[id: UUID]: string}}
}
export function SingleObjectEditor(props: SingleObjectEditorProps) {
    if (editorConfig.hiddenJsonKeys.includes(props.keyName)) {
        return <></>;
    }

     return (
        <div className="group">
            <label className="w-full flex justify-between group-hover:bg-gray-500/10 px-2 py-1">
                <span className="flex py-1 px-2 select-none gap-1 items-center capitalize">
                    {props.keyName}
                    {!(props.value instanceof Object) && ":"}
                </span>
                {!(props.value instanceof Object) &&
                    <JsonSingleFieldEditor
                        value={props.value}
                        onChange={(value: any) => props.onChange(props.keyName, value)}
                        selection={props.selectionOnKey?.[props.keyName]}
                        className="w-0 grow bg-transparent outline-none"
                    />
                }
            </label>

            {props.value instanceof Object &&
                <ul className="pb-3 group-hover:bg-gray-500/10">
                    <JsonNestedEditor
                        keyName={props.keyName}
                        value={props.value}
                        onKeyValueChange={props.onChange}
                        selectionOnKey={props.selectionOnKey}
                    />
                </ul>
            }
        </div>
    );
}
