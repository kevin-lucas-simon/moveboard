import {EditorFieldType} from "../EditorFieldType";

export function EditorFieldObject(props: EditorFieldType<object>) {
    return (
        <div className={props.className}>[Object!]</div>
    );
}
