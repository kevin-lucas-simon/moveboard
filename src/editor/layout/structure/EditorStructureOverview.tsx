import {BaseTab} from "../../component/BaseTab";
import {LevelModel} from "../../../data/model/world/LevelModel";
import React from "react";
import {EditorStructureList} from "./list/EditorStructureList";
import {StructureTypes} from "../../../data/model/structure/StructureTypes";
import {createStructure} from "../../../data/factory/StructureFactory";
import {EditorReducerActions} from "../../reducer/editorReducer";
import {StructureID} from "../../../data/model/structure/StructureModel";

export type EditorStructureOverviewProps = {
    level: LevelModel,
    selectedStructure: StructureID | null,
    levelDispatcher: React.Dispatch<EditorReducerActions>,
}

export function EditorStructureOverview(props: EditorStructureOverviewProps) {
    const addStructure = (type?: string) => {
        if (!type || !(type in StructureTypes)) {
            return;
        }

        const structure = createStructure(type as StructureTypes);
        props.levelDispatcher({
            type: 'level_add_structure',
            payload: structure,
        })
    }

    return (
        <BaseTab
            title={"Structure"}
            onAction={addStructure}
            addOptions={Object.keys(StructureTypes)}
        >
            <ul>
                <EditorStructureList
                    structures={props.level.structures}
                    parent={null}
                    start={props.level.start}
                    selected={props.selectedStructure}
                    dispatcher={props.levelDispatcher}
                />
            </ul>
        </BaseTab>
    );
}
