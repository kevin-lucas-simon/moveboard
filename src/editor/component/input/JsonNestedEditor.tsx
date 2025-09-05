import {JsonFieldEditor} from "./JsonFieldEditor";
import {UUID} from "../../../data/model/system/UUID";
import {editorConfig} from "../../../config/editorConfig";

export type JsonNestedEditorProps = {
    keyName: string,
    displayname?: string,
    value: any,
    onKeyValueChange: (key: string, value: any) => void,
    selectionOnKey?: {[key: string]: {[id: UUID]: string}}
}

export function JsonNestedEditor(props: JsonNestedEditorProps) {
    if (editorConfig.hiddenJsonKeys.includes(props.keyName)) {
        return <></>;
    }

    const handleObjectChange = (key: string, value: any) => {
        props.onKeyValueChange(props.keyName, {
            ...props.value,
            [key]: value,
        });
    }

    const handleValueChange = (value: any) => {
        props.onKeyValueChange(props.keyName, value);
    }

    return (
        <>
            {/* display name and value view */}
            <li>
                <label className="flex gap-1">
                    {props.displayname &&
                        <>
                            <div className="h-px w-2 bg-gray-500/50 self-end -translate-y-2.5 mr-1"/>
                            <div className="select-none">
                                {props.displayname}
                                {!(props.value instanceof Object) && ":"}
                            </div>
                        </>
                    }
                    {!(props.value instanceof Object) &&
                        <JsonFieldEditor
                            className="w-0 grow bg-transparent outline-none"
                            value={props.value}
                            onChange={(value: any) => handleValueChange(value)}
                            selection={props.selectionOnKey?.[props.keyName]}
                        />
                    }
                </label>
            </li>

            {/* object view */}
            {props.value instanceof Object &&
                <li className="flex">
                    <div className="ml-4 bg-gray-500/50 w-px mt-2.5 -translate-y-2.5"/>

                    <ul className="grow">
                        {Object
                            .entries(props.value)
                            .map(([key, value]) => (
                                <JsonNestedEditor
                                    key={key}
                                    keyName={key}
                                    displayname={key}
                                    value={value}
                                    onKeyValueChange={handleObjectChange}
                                    selectionOnKey={props.selectionOnKey}
                                />
                            ))}
                    </ul>
                </li>
            }
        </>
    );
}
