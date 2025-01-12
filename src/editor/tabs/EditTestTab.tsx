import React from "react";
import {DebugSettings} from "../../experience/DebugSettingsProvider";
import {SingleObjectEditor} from "../SingleObjectEditor";
import {ArrowPathIcon} from "@heroicons/react/24/outline";
import {BaseTab} from "./BaseTab";

export type EditTestTabProps = {
    settings: DebugSettings;
    onSettingChange: (key: string, value: any) => void;
    onRestart: () => void;
}
export function EditTestTab(props: EditTestTabProps) {
    // TODO zudem soll in diesem Modus die Physik ausgeführt werden, die sonst im Editor deaktiviert ist
    // TODO des weiteren sollen entities zurückgesetzt werden wenn dieser Screen verlassen wird

    return (
        <BaseTab
            title={"Test Play"}
            description={"Test the behaviour of the chunk with some debug display options."}
            button={<><ArrowPathIcon className="h-4"/>Restart</>}
            onButtonClick={props.onRestart}
        >
            <ul>
                {Object.entries(props.settings).map(([key, value]) => {
                    return (
                        <SingleObjectEditor key={key} keyName={key} value={value} onChange={props.onSettingChange}/>
                    )
                })}
            </ul>
        </BaseTab>
    );
}
