import {EditorFieldType} from "../EditorFieldType";
import {UUID} from "../../../data/model/UUID";
import {useState} from "react";
import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions} from "@headlessui/react";
import clsx from "clsx";

export function EditorFieldRelation(props: EditorFieldType<UUID|null> & {
    options: {[id: UUID]: string},
    nullable?: boolean,
}) {
    const [query, setQuery] = useState<string>('');
    const filteredItems = Object.entries(props.options)
        .filter(([_, display]) => display.toLowerCase().includes(query.toLowerCase()))
    ;

    const handleSelect = (item: UUID) => {
        setQuery('');
        if (props.nullable && item === props.value) {
            return props.onChange(null);
        }
        return props.onChange(item);
    }

    return (
        <Combobox
            value={props.value}
            onChange={handleSelect}
            onClose={() => setQuery('')}
            immediate={true}
        >
            <ComboboxInput
                className={`w-full grow bg-transparent outline-none ${props.className ?? ''}`}
                displayValue={(item: UUID) => props.options[item] ?? ''}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={"Select..."}
            />
            <ComboboxOptions
                anchor="bottom start"
                className="w-[var(--input-width)] border-t border-gray-500/10 empty:invisible rounded-b-xl bg-white shadow-lg drop-shadow-xl "
            >
                {filteredItems.map(([id, display]) => (
                    <ComboboxOption
                        key={id}
                        value={id}
                        className={clsx(
                            "w-full px-4 py-1 data-[focus]:bg-gray-500/10",
                            props.nullable && "data-[selected]:bg-gray-500/20"
                        )}
                    >
                        {display}
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    );
}
