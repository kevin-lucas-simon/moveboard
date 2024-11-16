import {Game} from "./components/Game";
import {Level} from "./components/chunks/Level";

export function App() {
    return (
        <Game>
            <Level startChunk={"FirstChunk"} />
        </Game>
    );
}
