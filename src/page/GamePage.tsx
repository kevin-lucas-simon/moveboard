import {Environment} from "../experience/Environment";
import {useLevelDownloader} from "../experience/world/hook/useLevelDownloader";
import {Level} from "../experience/world/Level";

/**
 * Game page that initializes the game
 */
export function GamePage() {
    const downloadedLevel
        = useLevelDownloader("TestLevel");

    // TODO user modal to request permission

    return (
        <Environment>
            {downloadedLevel && <Level {...downloadedLevel} />}
        </Environment>
    );
}
