import {LevelModel} from "../data/model/world/LevelModel";
import {Environment} from "./world/Environment";
import {Level} from "./world/Level";
import {ExperienceProvider} from "./reducer/ExperienceProvider";
import {ChunkID} from "../data/model/structure/spacial/ChunkModel";
import {KeyboardKeysProvider} from "./input/KeyboardKeysProvider";
import {DeviceMotionProvider} from "./input/DeviceMotionProvider";

export type ExperienceProps = {
    isGranted: boolean,
    level?: LevelModel,
    start?: ChunkID,
}
export function Experience(props: ExperienceProps) {
    return (
        <DeviceMotionProvider isGranted={props.isGranted}>
            <KeyboardKeysProvider>
                <Environment>
                    {props.level &&
                        <ExperienceProvider level={props.level}>
                            <Level {...props.level} start={props.start ?? props.level.start}/>
                        </ExperienceProvider>
                    }
                </Environment>
            </KeyboardKeysProvider>
        </DeviceMotionProvider>
    );
}
