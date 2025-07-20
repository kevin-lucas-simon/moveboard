import {useLevelDownloader} from "../data/repository/useLevelDownloader";
import {LevelEditor} from "../editor/LevelEditor";
import {useParams} from "react-router-dom";
import {EditorProvider} from "../editor/reducer/EditorProvider";

export function EditorPage() {
    const {levelName} = useParams();

    const downloadedLevel = useLevelDownloader(levelName ?? "");
    if (!downloadedLevel) {
        return <></>;
    }

    return (
        <EditorProvider initial={downloadedLevel}>
            <LevelEditor key={levelName} />
        </EditorProvider>
    )
}
