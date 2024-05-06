import {Level} from "../../components/chunks/Level.tsx";
import {FirstChunk} from "./chunks/FirstChunk";
import {SecondChunk} from "./chunks/SecondChunk";
import {PlayerBall} from "../../components/entities/PlayerBall";

export function TestLevel() {
    return (
        <Level start={FirstChunk.name}>
            <PlayerBall />
            <FirstChunk />
            <SecondChunk />
        </Level>
    )
}
