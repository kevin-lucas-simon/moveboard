import {
    CheckIcon, ChevronDownIcon, MagnifyingGlassIcon, PlusIcon
} from "@heroicons/react/24/outline";
import React, {useState} from "react";
import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions} from "@headlessui/react";

export type ChunkSearchBarProps = {
    options: string[];
    active?: string|null;
    onSelect?: ((item: string) => void);
    onCreate?: ((item: string) => void);
}
export function ChunkSwitcher(props: ChunkSearchBarProps) {
    const [query, setQuery] = useState<string>('');

    const filteredItems = query === ''
        ? props.options
            .slice(0, 12)
        : props.options
            .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 12)

    const handleItemSelect = (item: string|null) => {
        if (item === null) {
            return;
        }

        if (filteredItems.includes(item) && props.onSelect) {
            props.onSelect(item)
            return;
        }

        if (props.onCreate) {
            props.onCreate(item)
            return;
        }
    }

    return (
        <Combobox
            value={null}
            onChange={handleItemSelect}
            onClose={() => setQuery('')}
            immediate={true}
        >
            <div className="relative max-w-sm mx-auto rounded-md">
                <ComboboxButton className="group absolute inset-y-0 left-0 m-1.5">
                    <ChevronDownIcon className="h-5 group-data-[open]:hidden"/>
                    <MagnifyingGlassIcon className="h-5 hidden group-data-[open]:block"/>
                </ComboboxButton>
                <ComboboxInput
                    key={props.active}
                    className="w-full bg-transparent py-1 pl-8 pr-2 focus:outline-none text-2xl leading-none placeholder-black focus:placeholder-transparent"
                    displayValue={(item: string) => item}
                    placeholder={props.active ?? "Search or create chunk..."}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>

            <ComboboxOptions
                anchor="bottom start"
                className="w-[var(--input-width)] empty:invisible rounded-md [--anchor-gap:4px] border border-gray-300"
            >
                {filteredItems.map((item) => (
                    <ComboboxOption
                        key={item}
                        value={item}
                        className="flex gap-2 items-center bg-gray-200 data-[focus]:bg-gray-300 py-1 px-2"
                    >
                        {item === props.active ?
                            <CheckIcon className="w-4"/>
                            :
                            <span className="w-4"/>
                        }
                        {item}
                    </ComboboxOption>
                ))}

                {!filteredItems.includes(query) &&
                    <ComboboxOption
                        value={query}
                        className="flex gap-2 items-center bg-gray-200 data-[focus]:bg-gray-300 py-1 px-2"
                        disabled={query === ""}
                    >
                        {query === "" ?
                            <>
                                <PlusIcon className="w-4 text-gray-600"/>
                                <i className="text-gray-600">Create Chunk by typing...</i>
                            </>
                            :
                            <>
                                <PlusIcon className="w-4"/>
                                <i>Create Chunk "{query}"</i>
                            </>
                        }
                    </ComboboxOption>
                }
            </ComboboxOptions>
        </Combobox>
    );
}