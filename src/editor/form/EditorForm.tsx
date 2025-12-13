import {EditorFormFieldMapping} from "./partial/EditorFormFieldMapping";

export type EditorFormProps<T extends object> = {
    itemValue: T;
    itemDefault: T;
    hiddenKeys?: (keyof T)[];
    onChange: (newValue: T) => void;
}

export function EditorForm<T extends object>(props: EditorFormProps<T>) {
    const alwaysHiddenKeys: string[] = ["id", "type", "parent"];

    const itemKeys = (Object.keys(props.itemDefault) as (keyof T)[])
        .filter((key) => !alwaysHiddenKeys.includes(String(key)))
        .filter((key) => !(props.hiddenKeys ?? []).includes(key))
    ;

    const onChange = (key: keyof T, value: any) => {
        props.onChange({
            ...props.itemValue,
            [key]: value,
        })
    }

    return (
        <ul>
            {itemKeys.map((key) => (
                <li key={String(key)} className="w-full hover:bg-gray-500/10">
                    <label className="w-full">
                        <div className="capitalize font-bold px-4 pt-2">{String(key)}</div>

                        <EditorFormFieldMapping
                            value={props.itemValue[key]}
                            onChange={newValue => onChange(key, newValue)}
                            className="pl-4 pt-1 pb-2"
                        />
                    </label>
                </li>
            ))}
        </ul>
    );
}
