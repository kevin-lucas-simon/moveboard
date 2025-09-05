import {useState} from "react";
import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions} from "@headlessui/react";
import {UUID} from "../../../data/model/UUID";

export type JsonSelectionFieldEditorProps = {
    value: string,
    onChange: (value: string) => void,
    options: {[id: UUID]: string},
    placeholder?: string,
}

export function JsonSelectionEditor(props: JsonSelectionFieldEditorProps) {
    const [query, setQuery] = useState<string>('');

    const filteredItems = query === ''
        ? props.options
        : Object.entries(props.options)
            .filter(([_, display]) => display.toLowerCase().includes(query.toLowerCase()))
            .map(([id, display]) => ({ id, display }))
    ;

    const handleSelect = (item: string) => {
        return props.onChange(item)
    }

    return (
        <Combobox
            value={props.value}
            onChange={handleSelect}
            onClose={() => setQuery('')}
            immediate={true}
        >
            <ComboboxInput
                className="w-full grow bg-transparent outline-none -ml-1 px-1 mr-1"
                displayValue={(item: UUID) => props.options[item] ?? ''}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={props.placeholder ?? "Select..."}
            />
            <ComboboxOptions
                anchor="bottom start"
                className="w-[var(--input-width)] empty:invisible rounded bg-gray-200"
            >
                {Object.entries(filteredItems).map(([id, display]) => (
                    <ComboboxOption
                        key={id}
                        value={id}
                        className="w-full data-[focus]:bg-gray-300 px-1"
                    >
                        {display}
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    );
}
