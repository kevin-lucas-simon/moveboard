import React from "react";
import {DebugSettings} from "../../experience/input/DebugSettingsProvider";
import {JsonObjectEditor} from "../component/input/JsonObjectEditor";
import {BaseTab} from "../component/BaseTab";

export type EditorPlayTestTabProps = {
    settings: DebugSettings;
    onSettingChange: (key: string, value: any) => void;
    onRestart: () => void;
}
export function EditorPlayTestTab(props: EditorPlayTestTabProps) {
    return (
        <BaseTab
            title={"Test Play"}
            description={"Test the behaviour of the chunk with some debug display options."}
        >
            <ul>
                {Object.entries(props.settings).map(([key, value]) =>
                    <JsonObjectEditor
                        key={key}
                        keyName={key}
                        value={value}
                        onChange={props.onSettingChange}
                    />
                )}
            </ul>
        </BaseTab>
    );
}
