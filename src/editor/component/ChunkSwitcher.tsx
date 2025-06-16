import {
    CheckIcon, ChevronDownIcon, MagnifyingGlassIcon, PlusIcon
} from "@heroicons/react/24/outline";
import React, {useState} from "react";
import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions} from "@headlessui/react";
import {ChunkModel} from "../../data/model/world/ChunkModel";
import {LevelReducerActions} from "../reducer/levelReducer";

export type ChunkSearchBarProps = {
    chunks: {[key: string]: ChunkModel};
    active: string;
    levelDispatcher: React.Dispatch<LevelReducerActions>;
}
export function ChunkSwitcher(props: ChunkSearchBarProps) {
    const [query, setQuery] = useState<string>('');

    const chunkNameActive = props.chunks[props.active]?.name;
    const chunkNameOptions = Object.values(props.chunks).map(chunk => chunk.name);

    const filteredItems = query === ''
        ? chunkNameOptions
            .slice(0, 12)
        : chunkNameOptions
            .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 12)

    const handleItemSelect = (name: string|null) => {
        const chunk = Object.values(props.chunks).find(chunk => chunk.name === name);
        if (!chunk) {
            return;
        }

        if (filteredItems.includes(chunk.name)) {
            props.levelDispatcher({
                type: 'level_select_chunk',
                payload: chunk.id,
            })
            return;
        }

        props.levelDispatcher({
            type: 'level_add_chunk',
            payload: chunk.id,
        })
    }

    return (
        <Combobox
            value={null}
            onChange={handleItemSelect}
            onClose={() => setQuery('')}
            immediate={true}
        >
            <div className="relative max-w-sm mx-auto rounded-lg hover:bg-gray-500/10 focus-within:bg-gray-500/10">
                <ComboboxButton className="group absolute inset-y-0 left-0 m-1.5">
                    <ChevronDownIcon className="h-5 group-data-[open]:hidden"/>
                    <MagnifyingGlassIcon className="h-5 hidden group-data-[open]:block"/>
                </ComboboxButton>
                <ComboboxInput
                    key={props.active}
                    className="w-full bg-transparent py-1 pl-8 pr-2 focus:outline-none text-2xl leading-none placeholder-black focus:placeholder-transparent"
                    displayValue={(item: string) => item}
                    placeholder={chunkNameActive ?? "Search or create chunk..."}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>

            <ComboboxOptions
                anchor="bottom start"
                className="w-[var(--input-width)] empty:invisible rounded-lg [--anchor-gap:0.875rem] drop-shadow-xl ring-1 ring-black/5 bg-white"
            >
                {filteredItems.map((item) => (
                    <ComboboxOption
                        key={item}
                        value={item}
                        className="flex gap-2 items-center data-[focus]:bg-gray-100 p-2"
                    >
                        {item === chunkNameActive ?
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
                        className="flex gap-2 items-center data-[focus]:bg-gray-100 p-2"
                        disabled={query === ""}
                    >
                        {query === "" ?
                            <>
                                <PlusIcon className="w-4 text-gray-500/50"/>
                                <i className="text-gray-500/50">Create Chunk by typing...</i>
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