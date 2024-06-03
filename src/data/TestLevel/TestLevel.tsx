import {FirstChunk} from "./chunks/FirstChunk";
import {Player} from "../../components/entities/Player";
import {SecondChunk} from "./chunks/SecondChunk";
import {Level} from "../../components/chunks/Level";
import {TunnelChunk} from "./chunks/TunnelChunk";
import {Vector3} from "three";

export function TestLevel() {
    return (
        <Level start={FirstChunk.name}>
            <Player position={new Vector3(0,1,0)} />
            <FirstChunk />
            <SecondChunk />
            <TunnelChunk />
        </Level>
    );
}
