import {EditorFieldType} from "../EditorFieldType";

export function EditorFieldNumber(props: EditorFieldType<number>) {
    return (
        <input
            type="number"
            value={props.value}
            className={`w-full bg-transparent outline-none ${props.className ?? ''}`}
            onChange={(e) => {
                const newValue = e.target.valueAsNumber;
                if (!isNaN(newValue)) {
                    props.onChange(newValue);
                }
            }}
        />
    );
}
