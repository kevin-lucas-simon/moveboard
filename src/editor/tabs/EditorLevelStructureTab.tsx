import {BaseTab} from "../component/BaseTab";
import {LevelModel} from "../../data/model/world/LevelModel";
import {LevelReducerActions} from "../reducer/levelReducer";
import React from "react";
import {EditorStructureList} from "./list/EditorStructureList";
import {ChunkModel} from "../../data/model/structure/spatial/ChunkModel";
import {CreateChunkDialog} from "../dialog/CreateChunkDialog";

export type EditorLevelStructureTabProps = {
    level: LevelModel,
    activeChunk: ChunkModel,
    levelDispatcher: React.Dispatch<LevelReducerActions>,
}

enum EditorDialogs {
    CHUNK_CREATE = "chunk_create",
}

export function EditorLevelStructureTab(props: EditorLevelStructureTabProps) {
    const [dialog, setDialog] = React.useState<EditorDialogs|null>(null);

    const handleCreateChunk = (name: string) => {
        props.levelDispatcher({
            type: 'level_add_chunk',
            payload: name,
        });
        setDialog(null);
    }

    return (
        <BaseTab
            title={"Level Chunks"}
            description={"Select and edit the chunks of the level."}
            onAction={() => setDialog(EditorDialogs.CHUNK_CREATE)}
        >
            <ul>
                <EditorStructureList
                    structures={props.level.structures}
                    active={props.activeChunk.id}
                    start={props.level.start}
                    dispatcher={props.levelDispatcher}
                />
            </ul>

            {dialog === EditorDialogs.CHUNK_CREATE &&
                <CreateChunkDialog
                    isOpen={true}
                    existingChunkNames={Object.keys(props.level.structures)}
                    onSubmit={handleCreateChunk}
                    onClose={() => setDialog(null)}
                />
            }
        </BaseTab>
    );
}
