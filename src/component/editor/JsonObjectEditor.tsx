import {JsonFieldEditor} from "./JsonFieldEditor";

export type JsonEditorProps = {
    keyName: string,
    displayname?: string,
    value: any,
    onKeyValueChange: (key: string, value: any) => void,
}

export function JsonObjectEditor(props: JsonEditorProps) {
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
            <div className="flex gap-1">
                {props.displayname &&
                    <>
                        <div className="h-px w-2 bg-black self-end -translate-y-2.5 mr-1"/>
                        <div>{props.displayname}:</div>
                    </>
                }
                {!(props.value instanceof Object) &&
                    <JsonFieldEditor
                        className="basis-2/3 bg-transparent grow"
                        value={props.value}
                        onChange={handleValueChange}
                    />
                }
            </div>

            {/* object view */}
            {props.value instanceof Object &&
                <div className="flex">
                    <div className="ml-4 bg-black w-px mt-2.5 -translate-y-2.5"/>

                    <div className="grow">
                        {Object.entries(props.value).map(([key, value]) => (
                            <JsonObjectEditor keyName={key} displayname={key} value={value} onKeyValueChange={handleObjectChange}/>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}
