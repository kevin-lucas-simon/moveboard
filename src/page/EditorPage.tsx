import {useLevelDownloader} from "../data/repository/useLevelDownloader";
import {LevelEditor} from "../editor/LevelEditor";
import {useParams} from "react-router-dom";

export function EditorPage() {
    const {levelName} = useParams();

    const downloadedLevel = useLevelDownloader(levelName ?? "");
    if (!downloadedLevel) {
        return <></>;
    }

    return (
        <LevelEditor downloadedLevel={downloadedLevel} key={levelName} />
    )
}
