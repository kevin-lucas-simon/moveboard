import {FirstChunk} from "./chunks/FirstChunk";
import {Player} from "../../components/entities/Player";
import {SecondChunk} from "./chunks/SecondChunk";
import {MultiChunk} from "./chunks/MultiChunk";
import {Level} from "../../components/chunks/Level";

export function TestLevel() {
    return (
        <Level start={FirstChunk.name}>
            <Player />
            <FirstChunk />
            <SecondChunk />
            <MultiChunk />
        </Level>
    );
}
