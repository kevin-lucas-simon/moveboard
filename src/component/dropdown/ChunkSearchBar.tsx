import {
    CheckIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import React, {useState} from "react";
import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions} from "@headlessui/react";

export type ChunkSearchBarProps = {
    items: string[];
    active?: string|null;
    onSelect?: ((item: string) => void);
    onCreate?: ((item: string) => void);
}
export function ChunkSearchBar(props: ChunkSearchBarProps) {
    const [query, setQuery] = useState<string>('')

    const filteredItems = query === ''
        ? props.items
            .slice(0, 12)
        : props.items
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
            <div className="relative max-w-sm mx-auto bg-gray-200 rounded-md">
                <ComboboxButton className="group absolute inset-y-0 left-0 m-2">
                    <MagnifyingGlassIcon className="h-4"/>
                </ComboboxButton>
                <ComboboxInput
                    className="w-full bg-transparent rounded-md py-1 pl-8 pr-2 focus:outline-none"
                    displayValue={(item: string) => item}
                    placeholder={"Search or create chunk..."}
                    onChange={(event) => setQuery(event.target.value)}
                />
                {query !== '' &&
                    <ComboboxButton
                        className="group absolute inset-y-0 right-0 m-2 p-0.5 rounded-full hover:bg-gray-300"
                        onClick={() => setQuery('')}
                    >
                        <XMarkIcon className="h-3"/>
                    </ComboboxButton>
                }
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