export type JsonFieldEditorProps = {
    value: any,
}

export function JsonFieldEditor(props: JsonFieldEditorProps) {
    if (typeof props.value === "string") {
        return (
            <input type={"text"} defaultValue={props.value} />
        );
    }

    if (typeof props.value === "number") {
        return (
            <input type={"number"} defaultValue={props.value} />
        );
    }

    if (typeof props.value === "boolean") {
        return (
            <input type={"checkbox"} checked={props.value} />
        );
    }

    return (
        <span>??</span>
    );
}
