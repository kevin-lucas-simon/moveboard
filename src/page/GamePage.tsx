import {UserControls} from "../experience/UserControls";
import {Experience} from "../experience/Experience";
import {useLevelDownloader} from "../experience/world/hook/useLevelDownloader";
import {Level} from "../experience/world/Level";

/**
 * Game page that initializes the game
 */
export function GamePage() {
    const downloadedLevel
        = useLevelDownloader("TestLevel");

    return (
        <UserControls>
            {/* TODO Übergreifendes Menü mit Permission-Abfrage -> dann erst <UserControls> einblenden! */}
            <Experience>
                {downloadedLevel && <Level {...downloadedLevel} />}
            </Experience>
        </UserControls>
    );
}
