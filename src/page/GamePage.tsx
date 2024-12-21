import {UserControls} from "../components/UserControls";
import {Experience} from "../components/Experience";
import {useLevelDownloader} from "../components/world/hook/useLevelDownloader";
import {NewLevel} from "../components/world/NewLevel";

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
                {downloadedLevel && <NewLevel {...downloadedLevel} />}
            </Experience>
        </UserControls>
    );
}
