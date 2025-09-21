import React, {useRef} from "react";
import {ElementModel} from "../../../../../data/model/element/ElementModel";

export type EditorChunkElementSlugProps = {
    element: ElementModel;
    onRename: (name: string) => void;
}

export function EditorChunkElementSlug(props: EditorChunkElementSlugProps) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(props.element.name || "");
    const inputRef = useRef<HTMLInputElement>(null);

    const enterEditMode = () => {
        if (!props.onRename) {
            return;
        }
        setIsEditing(true);
        if (!inputRef.current) {
            return;
        }
        inputRef.current.select();
    }

    const exitEditMode = () => {
        setIsEditing(false);
        if (!props.onRename) {
            return;
        }
        props.onRename(inputValue);
    }

    if (isEditing) {
        return (
            <form className="w-0 grow" onSubmit={() => exitEditMode()}>
                <input
                    ref={inputRef}
                    onBlur={exitEditMode}
                    onClick={exitEditMode}
                    onChange={(e) => setInputValue(e.target.value)}
                    onSubmit={exitEditMode}
                    type="text"
                    value={inputValue}
                    placeholder={props.element.type}
                    className="w-full bg-transparent outline-none"
                    autoFocus
                />
            </form>
        )
    }

    return (
        <button
            onDoubleClick={enterEditMode}
            className="w-0 grow truncate text-left"
        >
            {!props.element.name ? props.element.type : props.element.name}
        </button>
    );
}
