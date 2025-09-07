import {BaseTab} from "../component/BaseTab";
import {LevelModel} from "../../data/model/world/LevelModel";
import {LevelReducerActions} from "../reducer/levelReducer";
import React from "react";
import {EditorStructureList} from "./list/EditorStructureList";
import {StructureTypes} from "../../data/model/structure/StructureTypes";
import {createStructure} from "../../data/factory/StructureFactory";
import {ChunkModel} from "../../data/model/structure/spacial/ChunkModel";

export type EditorLevelStructureTabProps = {
    level: LevelModel,
    activeChunk: ChunkModel,
    levelDispatcher: React.Dispatch<LevelReducerActions>,
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
            title={"Level Chunks"}
            description={"Select and edit the chunks of the level."}
            onAction={addStructure}
            addOptions={Object.keys(StructureTypes)}
        >
            <ul>
                <EditorStructureList
                    structures={props.level.structures}
                    active={props.activeChunk.id}
                    start={props.level.start}
                    dispatcher={props.levelDispatcher}
                />
            </ul>
        </BaseTab>
    );
}
