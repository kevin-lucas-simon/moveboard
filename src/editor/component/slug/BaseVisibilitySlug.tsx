import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import React from "react";

export type BaseVisibilitySlugProps = {
    visible: boolean;
    onClick: () => void;
}

export function BaseVisibilitySlug(props: BaseVisibilitySlugProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        props.onClick();
    }

    return (
        <button
            onClick={handleClick}
            className="p-2 -mx-2 rounded-full hover:bg-gray-500/10"
        >
            {props.visible
                ? <EyeIcon className="w-4"/>
                : <EyeSlashIcon className="w-4"/>
            }
        </button>
    );
}
