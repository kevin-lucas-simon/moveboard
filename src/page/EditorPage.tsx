import {useLevelDownloader} from "../experience/world/hook/useLevelDownloader";
import {LevelEditor} from "../editor/LevelEditor";

export function EditorPage() {
    // TODO der Aufruf sollte über die URL erfolgen, nach dem Motto `editor/TestLevel/FirstChunk` oder so
    const levelName = "TestLevel";

    const downloadedLevel = useLevelDownloader(levelName);

    if (!downloadedLevel) {
        return <></>;
    }

    return (
        <LevelEditor downloadedLevel={downloadedLevel} key={levelName} />
    )
}
