import React, {useRef} from "react";

export type BaseSlugProps = {
    value: string;
    placeholder: string;
    onRename: (name: string) => void;
}

export function BaseInputSlug(props: BaseSlugProps) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(props.value || "");
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
                    placeholder={props.placeholder}
                    className="w-full h-full bg-transparent outline-none"
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
            {!props.value ? props.placeholder : props.value}
        </button>
    );
}