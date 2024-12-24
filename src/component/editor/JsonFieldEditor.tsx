export type JsonFieldEditorProps = {
    value: any,
    onChange: (value: any) => void, // TODO das any ist böse
}

export function JsonFieldEditor(props: JsonFieldEditorProps) {
    if (typeof props.value === "string") {
        return (
            <input
                type={"text"}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        );
    }

    if (typeof props.value === "number") {
        return (
            <input
                type={"number"}
                value={props.value}
                onChange={e => props.onChange(parseInt(e.target.value))}
            />
        );
    }

    console.warn(JsonFieldEditor.name + ": Unsupported value type ", typeof props.value);

    return (
        <span>Unsupported value type {typeof props.value}</span>
    );
}
