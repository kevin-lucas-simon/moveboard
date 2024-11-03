import {Game} from "./components/Game";
import {NewLevel} from "./components/chunks/NewLevel";
import {Vector3} from "three";
import {Player} from "./components/entities/Player";

export function App() {
    return (
        <Game>
            <NewLevel startChunk={"FirstChunk"} />
            {/* TODO Player sollten vom Chunk aus generiert werden */}
            <Player position={new Vector3(0,1,0)} />
        </Game>
    );
}
