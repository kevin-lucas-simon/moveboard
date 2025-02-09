import React from "react";
import {Dialog, DialogPanel} from "@headlessui/react";
import {BasicButton} from "../button/BasicButton";
import {MoveBoardLogo} from "../asset/MoveBoardLogo";
import {useLevelOverviewDownloader} from "../../repository/useLevelOverviewDownloader";

export type StartupModalProps = {
    isStarted: boolean,
    onStart: (level: string) => void,
}
export function LevelSelection(props: StartupModalProps) {
    const levelOverview = useLevelOverviewDownloader();
    console.log(levelOverview);

    return (
        <Dialog
            open={!props.isStarted}
            as="div"
            className="fixed inset-0 z-10 w-full h-full overflow-y-auto"
            onClose={() => {}}
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
                    {levelOverview &&
                        <div className="flex flex-col gap-2 text-center">
                            {levelOverview.map((level) => (
                                <div>
                                    <BasicButton
                                        key={level.id}
                                        type={"primary"}
                                        onClick={() => props.onStart(level.id)}
                                    >
                                        {level.name}
                                    </BasicButton>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </DialogPanel>
        </Dialog>
    );
}
