import {JsonNestedEditor} from "./JsonNestedEditor";
import React from "react";
import {JsonFieldEditor} from "./JsonFieldEditor";

export type SingleObjectEditorProps = {
    keyName: string,
    value: any,
    onChange: (key: string, value: any) => void,
}
export function SingleObjectEditor(props: SingleObjectEditorProps) {
    // TODO prüfen ob das sich zu stark mit ListObjectEditor ähnelt

    return (
        <div className="group">
            <div className="w-full flex justify-between group-hover:bg-gray-500/10 px-2 py-1">
                <span className="flex py-1 px-2 select-none gap-1 items-center capitalize">
                    {props.keyName}
                    {!(props.value instanceof Object) && ":"}
                </span>
                {!(props.value instanceof Object) &&
                    <JsonFieldEditor
                        value={props.value}
                        onChange={(value: any) => props.onChange(props.keyName, value)}
                        className="w-0 grow bg-transparent outline-none"
                    />
                }
            </div>

            {props.value instanceof Object &&
                <div className="pb-3 group-hover:bg-gray-500/10">
                    <JsonNestedEditor
                        keyName={props.keyName}
                        value={props.value}
                        onKeyValueChange={props.onChange}
                    />
                </div>
            }
        </div>
    );
}
