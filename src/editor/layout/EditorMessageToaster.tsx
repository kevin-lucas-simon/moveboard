import {Toast, useToaster} from 'react-hot-toast/headless';

export function EditorMessageToaster() {
    const { toasts, handlers } = useToaster();
    const { startPause, endPause } = handlers;

    return (
        <div
            onMouseEnter={startPause}
            onMouseLeave={endPause}
            className="fixed top-0 right-0 m-6 z-10 space-y-2"
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
            className="max-w-72 flex bg-white drop-shadow-lg shadow-lg rounded-lg px-4 py-2"
        >
            {props.message as string}
        </div>
    )
}