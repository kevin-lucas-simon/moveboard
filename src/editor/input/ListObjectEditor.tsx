import {JsonNestedEditor} from "./JsonNestedEditor";
import React from "react";
import {ChevronDownIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import {UUID} from "../../data/model/shared/UUID";

export type ListObjectEditorProps = {
    keyName: string, // key is reserved for React, so we use keyName instead
    displayname?: string,
    value: any,
    onChange: (key: string, value: any) => void,
    selectionOnKey?: {[key: string]: {[id: UUID]: string}},
    actionButton?: React.ReactNode,
    isExpanded?: boolean, // TODO make it mandatory!
    toggleExpand?: () => void,
    onAction?: () => void,
    children?: React.ReactNode;
}

export function ListObjectEditor(props: ListObjectEditorProps) {
    return (
        <div className={props.isExpanded ? "group bg-gray-500/5" : "group"}>
            <div className="w-full flex justify-between hover:bg-gray-500/10 px-2 py-1">
                <button className="flex grow py-1 px-2 select-none gap-1 items-center" onClick={props.toggleExpand}>
                    {props.isExpanded
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

            {props.isExpanded &&
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
