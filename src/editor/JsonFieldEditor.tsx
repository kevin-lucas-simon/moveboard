export type JsonFieldEditorProps = {
    value: any,
    onChange: (value: any) => void,
    className?: string,
}

export function JsonFieldEditor(props: JsonFieldEditorProps) {
    if (typeof props.value === "string") {
        return (
            <input
                type={"text"}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                className={props.className}
            />
        );
    }

    if (typeof props.value === "number") {
        return (
            <input
                type={"number"}
                value={props.value}
                onChange={e => props.onChange(parseInt(e.target.value))}
                className={props.className}
            />
        );
    }

    console.warn(JsonFieldEditor.name + ": Unsupported value type ", typeof props.value);

    return (
        <span className={props.className}>
            ??
        </span>
    );
}
