import {LevelModel} from "../data/model/world/LevelModel";
import {Environment} from "./world/Environment";
import {Level} from "./world/Level";
import {LevelStateProvider} from "./reducer/LevelStateProvider";
import {ChunkID} from "../data/model/structure/spacial/ChunkModel";
import {KeyboardKeysProvider} from "./input/KeyboardKeysProvider";
import {DeviceMotionProvider} from "./input/DeviceMotionProvider";

export function Experience(props: {
    isGranted: boolean,
    level?: LevelModel,
    start?: ChunkID,
}) {
    return (
        <DeviceMotionProvider isGranted={props.isGranted}>
            <KeyboardKeysProvider>
                <Environment>
                    {props.level &&
                        <LevelStateProvider level={props.level} startChunkID={props.start}>
                            <Level {...props.level}/>
                        </LevelStateProvider>
                    }
                </Environment>
            </KeyboardKeysProvider>
        </DeviceMotionProvider>
    );
}
