import {JsonFieldEditor} from "./JsonFieldEditor";

export type JsonEditorProps = {
    keyword: string, // TODO das keyword sollte optional sein wegen der Darstellung (was bringt mir der Name eines Elements)
    value: any,
    onKeyValueChange: (key: string, value: any) => void,
}

export function JsonObjectEditor(props: JsonEditorProps) {
    const handleObjectChange = (key: string, value: any) => {
        props.onKeyValueChange(props.keyword, {
            ...props.value,
            [key]: value,
        });
    }

    const handleValueChange = (value: any) => {
        props.onKeyValueChange(props.keyword, value);
    }

    if (props.value instanceof Object) {
        return (
            <div className="my-1">
                <div className="flex">
                    <div className="h-px w-2 bg-black self-end -translate-y-2.5 mr-1"/>
                    {props.keyword}
                </div>

                <div className="flex">
                    <div className="ml-4 bg-black w-px mt-2.5 -translate-y-2.5" />

                    <div className="grow">
                        {Object.entries(props.value).map(([key, value]) => (
                            <JsonObjectEditor keyword={key} value={value} onKeyValueChange={handleObjectChange}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-1">
            <div className="h-px w-2 bg-black self-end -translate-y-2.5" />
            <div>{props.keyword}:</div>
            <JsonFieldEditor
                className="basis-2/3 bg-transparent grow"
                value={props.value}
                onChange={handleValueChange}
            />
        </div>
    );
}
