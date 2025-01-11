import {useLevelDownloader} from "../experience/world/hook/useLevelDownloader";
import {LevelEditor} from "../component/editor/LevelEditor";

export function EditorPage() {
    const levelName = "TestLevel";

    const downloadedLevel = useLevelDownloader(levelName);

    if (!downloadedLevel) {
        return <></>;
    }

    return (
        <LevelEditor downloadedLevel={downloadedLevel} key={levelName} />
    )
}
