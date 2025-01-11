import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/react/24/outline";
import React, {useState} from "react";
import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions} from "@headlessui/react";

export type EditorChunkSearchBarProps = {
    chunks: string[];
    activeChunk: string;
    onChunkSelect?: ((chunk: string) => void);
}
export function EditorChunkSearchBar(props: EditorChunkSearchBarProps) {
    const [selectedChunk, setSelectedChunk] = useState<string|null>()
    const [query, setQuery] = useState<string>('')

    const filteredChunks =
        query === ''
            ? props.chunks.filter((chunk) => chunk !== props.activeChunk)
            : props.chunks.filter((chunk) => {
                if (chunk === props.activeChunk) {
                    return false
                }
                return chunk.toLowerCase().includes(query.toLowerCase())
            })

    const handleChunkSelect = (chunk: string|null) => {
        setSelectedChunk(null)
        if (chunk && props.onChunkSelect) {
            props.onChunkSelect(chunk)
        }
    }

    const handleInputClear = () => {
        setSelectedChunk(null)
        setQuery('')
    }

    return (
        <>
            <Combobox
                value={selectedChunk}
                onChange={handleChunkSelect}
                onClose={() => setQuery('')}
            >
                <div className="relative max-w-sm mx-auto bg-gray-200 rounded-md">
                    <ComboboxButton className="group absolute inset-y-0 left-0 m-2">
                        <MagnifyingGlassIcon className="h-4"/>
                    </ComboboxButton>
                    <ComboboxInput
                        className="w-full bg-transparent rounded-md py-1 pl-8 pr-2 focus:outline-none"
                        displayValue={(chunk: string) => chunk}
                        placeholder="Search chunk..."
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    {(query !== '' || selectedChunk) && (
                        <ComboboxButton
                            className="group absolute inset-y-0 right-0 m-2 p-0.5 rounded-full hover:bg-gray-300"
                            onClick={handleInputClear}
                        >
                            <XMarkIcon className="h-3"/>
                        </ComboboxButton>
                    )}
                </div>

                <ComboboxOptions
                    anchor="bottom start"
                    className="w-[var(--input-width)] empty:invisible rounded-md [--anchor-gap:4px] border border-gray-300"
                >
                    {filteredChunks.map((chunk) => (
                        <ComboboxOption
                            key={chunk}
                            value={chunk}
                            className="bg-gray-200 data-[focus]:bg-gray-300 py-1 pl-8 pr-2"
                        >
                            {chunk}
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </>
);
}