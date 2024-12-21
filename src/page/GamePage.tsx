import {UserControls} from "../components/UserControls";
import {Experience} from "../components/Experience";
import {useLevelDownloader} from "../components/world/hook/useLevelDownloader";
import {Level} from "../components/world/Level";

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
