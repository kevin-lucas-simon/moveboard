export type StartModalProps = {
    onSubmit: () => void,
}

/**
 * Modal to show the user before starting the demo to ask for device permissions
 * @param props
 * @constructor
 */
export function StartModal(props: StartModalProps) {
    return (
        <div className="fixed z-10 w-full h-full flex items-center justify-center backdrop-blur p-8">
            <div className="bg-white rounded p-8">
                <h1 className="text-2xl font-bold mb-2">
                    Moveboard Techdemo
                </h1>
                <p className="mb-2">
                    Utilisation of gravity and motion data in 3D web engine.
                    <br/>
                    Please use your smartphone.
                </p>
                <button
                    onClick={props.onSubmit}
                    className="border-2 border-black bg-black text-white rounded p-1 hover:bg-white hover:text-black transition"
                >
                    Start demo
                </button>
            </div>
        </div>
    );
}
