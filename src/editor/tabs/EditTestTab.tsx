import React from "react";
import {DebugSettings} from "../../experience/DebugSettingsProvider";
import {SingleObjectEditor} from "../SingleObjectEditor";
import {ArrowPathIcon} from "@heroicons/react/24/outline";

export type EditTestTabProps = {
    settings: DebugSettings;
    onSettingChange: (key: string, value: any) => void;
    onRestart: () => void;
}
export function EditTestTab(props: EditTestTabProps) {
    // TODO zudem soll in diesem Modus die Physik ausgeführt werden, die sonst im Editor deaktiviert ist
    // TODO des weiteren sollen entities zurückgesetzt werden wenn dieser Screen verlassen wird

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-xl pt-4 px-4">Test Play</h2>
            <div className="grow h-0 overflow-y-auto">
                <p className="text-sm px-4 py-2">
                    Test the behaviour of the chunk with some debug display options.
                </p>
                <ul>
                    {Object.entries(props.settings).map(([key, value]) => {
                        return (
                            <SingleObjectEditor key={key} keyName={key} value={value} onChange={props.onSettingChange}/>
                        )
                    })}
                </ul>
            </div>
            <button
                className="flex w-full hover:bg-gray-500/10 px-4 py-2 gap-2 border-t border-gray-500/10 items-center"
                onClick={props.onRestart}
            >
                <ArrowPathIcon className="h-4"/>
                Restart
            </button>
        </div>
    );
}
