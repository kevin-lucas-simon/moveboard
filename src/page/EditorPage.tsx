import {Level} from "../experience/world/Level";
import {Experience} from "../experience/Experience";
import {useLevelDownloader} from "../experience/world/hook/useLevelDownloader";

export function EditorPage() {
    const downloadedLevel
        = useLevelDownloader("TestLevel");

    return (
        <Experience>
            {downloadedLevel && <Level {...downloadedLevel} />}
        </Experience>
    );
}
