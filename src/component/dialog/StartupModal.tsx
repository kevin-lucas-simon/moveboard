import React from "react";
import {Dialog, DialogPanel} from "@headlessui/react";
import {BasicButton} from "../button/BasicButton";
import {MoveBoardLogo} from "../asset/MoveBoardLogo";

export type StartupModalProps = {
    isStarted: boolean,
    onStart: () => void,
}
export function StartupModal(props: StartupModalProps) {
    return (
        <Dialog
            open={!props.isStarted}
            as="div"
            className="fixed inset-0 z-10 w-full h-full overflow-y-auto"
            onClose={props.onStart}
        >
            <DialogPanel
                transition
                className="w-full h-full bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
                <div className="h-full w-full flex flex-col p-8 text-center">
                    <div className="h-2/3 flex gap-4 items-center justify-center">
                        <MoveBoardLogo />
                        <div className="text-4xl font-semibold">Moveboard</div>
                    </div>
                    <div className="grow text-center">
                        Utilisation of gravity and motion data in 3D web engine.
                        <br/>
                        Please use your smartphone.
                    </div>
                    <div className="text-center">
                        <BasicButton type={"primary"} onClick={props.onStart}>Go into the experience</BasicButton>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    );
}
