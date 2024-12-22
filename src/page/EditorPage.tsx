import {Level} from "../experience/world/Level";
import {Environment} from "../experience/Environment";
import {useLevelDownloader} from "../experience/world/hook/useLevelDownloader";

export function EditorPage() {
    const downloadedLevel
        = useLevelDownloader("TestLevel");

    return (
        <Environment>
            {downloadedLevel && <Level {...downloadedLevel} />}
        </Environment>
    );
}
