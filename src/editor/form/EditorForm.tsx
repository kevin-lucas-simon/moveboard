import {EditorFormFieldMapping} from "./partial/EditorFormFieldMapping";
import React from "react";
import {EditorFieldRelation} from "./field/EditorFieldRelation";
import {UUID} from "../../data/model/UUID";

export type EditorFormProps<T extends object> = {
    itemValue: T;
    itemDefault: T;
    hiddenKeys?: (keyof T)[];
    relationKeys?: {[key in keyof T]?: {[id: UUID|string]: string}};
    additionalEntries?: {[key in Exclude<string, keyof T>]: React.ReactNode};
    onChange: (newValue: T) => void;
}

export function EditorForm<T extends object>(props: EditorFormProps<T>) {
    const alwaysHiddenKeys: string[] = ["id", "type", "parent"];

    const itemKeys = (Object.keys(props.itemDefault) as (keyof T)[])
        .filter((key) => !alwaysHiddenKeys.includes(String(key)))
        .filter((key) => !(props.hiddenKeys ?? []).includes(key))
    ;

    const onChange = (key: keyof T, value: any) => {
        props.onChange({
            ...props.itemValue,
            [key]: value,
        })
    }

    return (
        <ul>
            {itemKeys.map((key) => (
                <EditorFormEntry key={String(key)} label={String(key)}>
                    {props.relationKeys && props.relationKeys[key] ? (
                        <EditorFieldRelation
                            value={props.itemValue[key] as UUID}
                            onChange={newValue => onChange(key, newValue)}
                            options={props.relationKeys[key]!}
                            nullable={props.itemDefault[key] === null}
                            className="pl-4 pt-1 pb-2"
                        />
                    ) : (
                        <EditorFormFieldMapping
                            value={props.itemValue[key]}
                            onChange={newValue => onChange(key, newValue)}
                            className="pl-4 pt-1 pb-2"
                        />
                    )}
                </EditorFormEntry>
            ))}
            {props.additionalEntries && (Object.entries(props.additionalEntries) as [string, React.ReactNode][]).map(([key, component]) => (
                <EditorFormEntry key={key} label={key}>
                    {component}
                </EditorFormEntry>
            ))}
        </ul>
    );
}

function EditorFormEntry(props: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <li className="w-full hover:bg-gray-500/10">
            <label className="w-full">
                <div className="capitalize font-bold px-4 pt-2">
                    {props.label}
                </div>
                {props.children}
            </label>
        </li>
    )
}