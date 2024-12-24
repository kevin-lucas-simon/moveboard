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
            <div>
                {props.keyword}:
                <div className="pl-4">
                    {Object.entries(props.value).map(([key, value]) => (
                        <JsonObjectEditor keyword={key} value={value} onKeyValueChange={handleObjectChange} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>{props.keyword}: <JsonFieldEditor value={props.value} onChange={handleValueChange} /></div>
    );
}
