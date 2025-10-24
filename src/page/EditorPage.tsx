import {LevelEditor} from "../editor/LevelEditor";
import {useParams} from "react-router-dom";
import {EditorProvider} from "../editor/reducer/EditorProvider";
import {useLiveQuery} from "dexie-react-hooks";
import {localEditorDB} from "../data/localEditorDB";
import {EditorID} from "../editor/reducer/editorReducer";

export function EditorPage() {
    const {editorID} = useParams();

    const editorState = useLiveQuery(
        () => localEditorDB.get(editorID as EditorID),
        [editorID],
    );

    if (!editorState) {
        return <></>
    }

    return (
        <EditorProvider editorState={editorState}>
            <LevelEditor/>
        </EditorProvider>
    )
}
