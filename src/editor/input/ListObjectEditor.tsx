import {JsonNestedEditor} from "./JsonNestedEditor";
import React, {useState} from "react";
import {ChevronDownIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import {UUID} from "../../model/util/UUID";

export type ListObjectEditorProps = {
    keyName: string, // key is reserved for React, so we use keyName instead
    displayname?: string,
    value: any,
    onChange: (key: string, value: any) => void,
    selectionOnKey?: {[key: string]: {[id: UUID]: string}},
    actionButton?: React.ReactNode,
    onAction?: () => void,
    children?: React.ReactNode;
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

                {props.actionButton &&
                    <button
                        className="py-1 px-2 rounded-full hidden group-hover:block hover:bg-gray-500/10"
                        onClick={props.onAction}
                    >
                        {props.actionButton}
                    </button>
                }
            </div>

            {isOpen &&
                <ul className="pb-3 border-b border-gray-500/5">
                    <JsonNestedEditor
                        keyName={props.keyName}
                        value={props.value}
                        onKeyValueChange={props.onChange}
                        selectionOnKey={props.selectionOnKey}
                    />
                    {props.children}
                </ul>
            }
        </div>
    );
}
