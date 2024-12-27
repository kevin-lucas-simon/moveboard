import {JsonNestedEditor} from "./JsonNestedEditor";
import React, {useState} from "react";

export type JsonObjectEditorProps = {
    keyName: string,
    displayname?: string,
    value: any,
    onChange: (key: string, value: any) => void,
    onDelete: (key: string) => void,
}

export function JsonObjectEditor(props: JsonObjectEditorProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleExpand = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={isOpen ? "group bg-gray-500/5" : "group"}>
            <div className="w-full flex justify-between hover:bg-gray-500/10 px-2 py-1">
                <button className="flex grow py-1 px-2 select-none gap-1" onClick={toggleExpand}>
                    {isOpen
                        ? <span className="w-4 text-left">&#9207;</span>
                        : <span className="w-4 text-left">&#9205;</span>}
                    <span>{props.displayname ?? props.keyName}</span>
                </button>

                <button className="py-1 px-2 hidden group-hover:block" onClick={() => props.onDelete(props.keyName)}>
                    <span>&times;</span>
                </button>
            </div>

            {isOpen &&
                <div className="pb-2">
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
