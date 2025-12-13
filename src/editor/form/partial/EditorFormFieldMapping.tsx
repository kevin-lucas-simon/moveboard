import {EditorFieldType} from "../EditorFieldType";
import {EditorFieldObject} from "../field/EditorFieldObject";
import {EditorFieldNumber} from "../field/EditorFieldNumber";
import {EditorFieldString} from "../field/EditorFieldString";
import {EditorFieldBoolean} from "../field/EditorFieldBoolean";

export function EditorFormFieldMapping(props: EditorFieldType<any>) {
    switch (typeof props.value) {
        case "object":
            return <EditorFieldObject {...props} />;
        case "string":
            return <EditorFieldString {...props} />;
        case "number":
            return <EditorFieldNumber {...props} />;
        case "boolean":
            return (
                <div className={props.className}>
                    <EditorFieldBoolean {...props} className="mr-auto"/>
                </div>
            )
        default:
            console.warn("Unsupported editor form value type ", typeof props.value);
            return <div className={props.className}>??</div>;
    }
}