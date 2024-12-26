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
        <>
            <div className="w-full flex gap-2 justify-between hover:bg-gray-500/10">
                <button className="flex grow py-1 px-2 select-none gap-2" onClick={toggleExpand}>
                    {isOpen ? <span>&#9207;</span> : <span>&#9205;</span>}
                    <span>{props.displayname ?? props.keyName}</span>
                </button>

                <button className="py-1 px-2" onClick={() => props.onDelete(props.keyName)}>
                    <span>&times;</span>
                </button>
            </div>

            {isOpen &&
                <div className="mb-2">
                    <JsonNestedEditor
                        keyName={props.keyName}
                        value={props.value}
                        onKeyValueChange={props.onChange}
                    />
                </div>
            }
        </>
    );
}
