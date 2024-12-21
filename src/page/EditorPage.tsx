import {NewLevel} from "../components/world/NewLevel";
import {Experience} from "../components/Experience";
import {useLevelDownloader} from "../components/world/hook/useLevelDownloader";

export function EditorPage() {
    const downloadedLevel
        = useLevelDownloader("TestLevel");

    return (
        <Experience>
            {downloadedLevel && <NewLevel {...downloadedLevel} />}
        </Experience>
    );
}
