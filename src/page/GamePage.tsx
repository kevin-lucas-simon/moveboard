import {UserControls} from "../components/UserControls";
import {Experience} from "../components/Experience";
import {Level} from "../components/chunks/Level";

/**
 * Game page that initializes the game
 */
export function GamePage() {
    return (
        <UserControls>
            {/* TODO Übergreifendes Menü mit Permission-Abfrage -> dann erst <UserControls> einblenden! */}
            <Experience>
                <Level startChunk={"FirstChunk"} />
            </Experience>
        </UserControls>
    );
}
