import {LevelEditor} from "../editor/LevelEditor";
import {useParams} from "react-router-dom";
import {EditorProvider} from "../editor/reducer/EditorProvider";
import {EditorID} from "../editor/reducer/editorReducer";

export function EditorPage() {
    const {editorID} = useParams();
    if (!editorID) {
        return null;
    }

    return (
        <EditorProvider editorID={editorID as EditorID}>
            <LevelEditor/>
        </EditorProvider>
    )
}
