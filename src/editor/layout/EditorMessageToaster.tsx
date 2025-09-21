import {ValidationError} from "../../data/validator/Validator";

import toast, {Toast, useToaster} from 'react-hot-toast/headless';
import {useEffect} from "react";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";

export type EditorToasterProps = {
    errors: ValidationError[];
}

export function EditorMessageToaster(props: EditorToasterProps) {
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
            className="w-72 flex bg-white shadow-lg rounded-lg"
        >
            <ExclamationCircleIcon className="flex-none w-4 h-4 mt-3 ml-3 mr-1 text-gray-500"/>
            <span className="p-2">
                {props.message as string}
            </span>

        </div>
    )
}