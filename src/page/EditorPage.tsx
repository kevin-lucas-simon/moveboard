import {Level} from "../components/world/Level";
import {Experience} from "../components/Experience";
import {useLevelDownloader} from "../components/world/hook/useLevelDownloader";

export function EditorPage() {
    const downloadedLevel
        = useLevelDownloader("TestLevel");

    return (
        <Experience>
            {downloadedLevel && <Level {...downloadedLevel} />}
        </Experience>
    );
}
