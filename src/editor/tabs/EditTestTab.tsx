import React from "react";
import {DebugSettings} from "../../experience/input/DebugSettingsProvider";
import {SingleObjectEditor} from "../SingleObjectEditor";
import {BaseTab} from "./BaseTab";

export type EditTestTabProps = {
    settings: DebugSettings;
    onSettingChange: (key: string, value: any) => void;
    onRestart: () => void;
}
export function EditTestTab(props: EditTestTabProps) {
    return (
        <BaseTab
            title={"Test Play"}
            description={"Test the behaviour of the chunk with some debug display options."}
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
