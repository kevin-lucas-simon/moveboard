import {useState} from "react";
import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions} from "@headlessui/react";

export type JsonSelectionFieldEditorProps = {
    value: string,
    onChange: (value: string) => void,
    options: string[],
    placeholder?: string,
}

export function JsonSingleSelectionEditor(props: JsonSelectionFieldEditorProps) {
    const [query, setQuery] = useState<string>('')

    const filteredItems = query === ''
        ? props.options
        : props.options.filter((item) => item.toLowerCase().includes(query.toLowerCase()))

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
                displayValue={(item: string) => item}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={props.placeholder ?? "Select..."}
            />
            <ComboboxOptions
                anchor="bottom start"
                className="w-[var(--input-width)] empty:invisible rounded bg-gray-200"
            >
                {filteredItems.map((item) => (
                    <ComboboxOption
                        key={item}
                        value={item}
                        className="w-full data-[focus]:bg-gray-300 px-1"
                    >
                        {item}
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    );
}
