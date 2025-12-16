import {EditorFieldType} from "../EditorFieldType";
import {EditorFormFieldMapping} from "../partial/EditorFormFieldMapping";
import {MinusIcon} from "@heroicons/react/24/outline";

export function EditorFieldObject(props: EditorFieldType<object>) {
    const onChange = (key: string, value: any) => {
        props.onChange({
            ...props.value,
            [key]: value,
        });
    }

    return (
        <div className={props.className}>
            {Object.entries(props.value).map(([key, value]) => (
                <label key={key} className="flex gap-1 items-start">
                    <MinusIcon className="w-3.5 text-gray-500/50 mt-1.5 shrink-0"/>
                    <div className={"flex " + (typeof value === "object" ? "flex-col" : "gap-1")}>
                        <span>
                            {key}
                            {typeof value !== "object" && ":"}
                        </span>
                        <EditorFormFieldMapping
                            value={value}
                            onChange={(value) => onChange(key, value)}
                        />
                    </div>
                </label>
            ))}
        </div>
    );
}
