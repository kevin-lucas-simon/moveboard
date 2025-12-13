import {EditorFieldType} from "../EditorFieldType";

export function EditorFieldString(props: EditorFieldType<string>) {
    return (
        <input
            type="text"
            className={`w-full bg-transparent outline-none ${props.className ?? ''}`}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={"Type..."}
        />
    );
}
