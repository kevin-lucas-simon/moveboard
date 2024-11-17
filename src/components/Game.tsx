import {UserControls} from "./UserControls";
import {Experience} from "./Experience";
import {Level} from "./chunks/Level";

export type GameProps = {
    startChunk: string,
}

/**
 * Main game component to initialize the game
 * @param props
 * @constructor
 */
export function Game(props: GameProps) {
    return (
        <UserControls>
            {/* TODO Übergreifendes Menü mit Permission-Abfrage -> dann erst <UserControls> einblenden! */}
            <Experience>
                <Level startChunk={props.startChunk} />
            </Experience>
        </UserControls>
    );
}
