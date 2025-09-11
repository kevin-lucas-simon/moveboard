import {BaseTab} from "../component/BaseTab";
import {LevelModel} from "../../data/model/world/LevelModel";
import React from "react";
import {EditorStructureList} from "./list/structure/EditorStructureList";
import {StructureTypes} from "../../data/model/structure/StructureTypes";
import {createStructure} from "../../data/factory/StructureFactory";
import {ChunkModel} from "../../data/model/structure/spacial/ChunkModel";
import {EditorReducerActions} from "../reducer/editorReducer";
import {StructureID} from "../../data/model/structure/StructureModel";

export type EditorLevelStructureTabProps = {
    level: LevelModel,
    activeChunk: ChunkModel,
    selectedStructures: StructureID[],
    levelDispatcher: React.Dispatch<EditorReducerActions>,
}

export function EditorLevelStructureTab(props: EditorLevelStructureTabProps) {
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
                    active={props.activeChunk.id}
                    start={props.level.start}
                    selected={props.selectedStructures}
                    dispatcher={props.levelDispatcher}
                />
            </ul>
        </BaseTab>
    );
}
