import {Game} from "./components/Game";
import {NewLevel} from "./components/chunks/NewLevel";

export function App() {
    return (
        <Game>
            <NewLevel startChunk={"FirstChunk"} />
        </Game>
    );
}
