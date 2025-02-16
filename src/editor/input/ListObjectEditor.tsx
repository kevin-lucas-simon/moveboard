import {JsonNestedEditor} from "./JsonNestedEditor";
import React, {useState} from "react";
import {ChevronDownIcon, ChevronRightIcon, XMarkIcon} from "@heroicons/react/24/outline";

export type ListObjectEditorProps = {
    keyName: string,
    displayname?: string,
    value: any,
    onChange: (key: string, value: any) => void,
    onDelete: (key: string) => void,
}

export function ListObjectEditor(props: ListObjectEditorProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleExpand = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={isOpen ? "group bg-gray-500/5" : "group"}>
            <div className="w-full flex justify-between hover:bg-gray-500/10 px-2 py-1">
                <button className="flex grow py-1 px-2 select-none gap-1 items-center" onClick={toggleExpand}>
                    {isOpen
                        ? <ChevronDownIcon className="w-4" />
                        : <ChevronRightIcon className="w-4" />}
                    <span>{props.displayname ?? props.keyName}</span>
                </button>

                <button className="py-1 px-2 hidden group-hover:block" onClick={() => props.onDelete(props.keyName)}>
                    <XMarkIcon className="w-4" />
                </button>
            </div>

            {isOpen &&
                <ul className="pb-3 border-b border-gray-500/5">
                    <JsonNestedEditor
                        keyName={props.keyName}
                        value={props.value}
                        onKeyValueChange={props.onChange}
                    />
                </ul>
            }
        </div>
    );
}
