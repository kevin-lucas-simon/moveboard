import {ValidationError} from "../../data/validator/Validator";

import toast, {Toast, useToaster} from 'react-hot-toast/headless';
import {useEffect} from "react";
import {XMarkIcon} from "@heroicons/react/24/outline";

export type EditorToasterProps = {
    errors: ValidationError[];
}

export function EditorToaster(props: EditorToasterProps) {
    const { toasts, handlers } = useToaster();
    const { startPause, endPause } = handlers;

    useEffect(() => {
        props.errors.forEach((error) => {
            toast(error.message);
        })
    }, [props.errors]);

    return (
        <div
            onMouseEnter={startPause}
            onMouseLeave={endPause}
            className="fixed top-12 right-0 m-6 z-10 space-y-2"
        >
            {toasts
                .filter((toast) => toast.visible)
                .map((toast) => EditorToast(toast))
            }
        </div>
    );
}

function EditorToast(props: Toast) {
    return (
        <div
            {...props.ariaProps}
            key={props.id}
            className="w-72 flex items-stretch justify-between bg-white shadow-lg rounded-lg"
        >
            <span className="p-2">
                {props.message as string}
            </span>
            <button
                onClick={() => toast.dismiss(props.id)}
                className="self-stretch p-2 rounded-r-lg hover:bg-gray-500/10"
            >
                <XMarkIcon className="w-4 h-4 text-gray-500"/>
            </button>
        </div>
    )
}