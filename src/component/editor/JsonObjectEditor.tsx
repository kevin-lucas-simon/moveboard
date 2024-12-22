import {JsonFieldEditor} from "./JsonFieldEditor";

export type JsonEditorProps = {
    keyword: string,
    value: any,
}

export function JsonObjectEditor(props: JsonEditorProps) {
    if (props.value instanceof Object) {
        return (
            <div>
                {props.keyword}:
                <div className="pl-4">
                    {Object.entries(props.value).map(([key, value]) => (
                        <JsonObjectEditor keyword={key} value={value} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>{props.keyword}: <JsonFieldEditor value={props.value} /></div>
    );
}
