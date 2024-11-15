import {Game} from "./components/Game";
import {Level} from "./components/chunks/Level";
import {Vector3} from "three";
import {Player} from "./components/entities/Player";

export function App() {
    return (
        <Game>
            <Level startChunk={"FirstChunk"} />
            {/* TODO Player sollten vom Chunk aus generiert werden */}
            <Player position={new Vector3(0,1,0)} />
        </Game>
    );
}
