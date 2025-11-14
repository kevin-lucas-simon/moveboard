import {Environment} from "../experience/Environment";
import {useLevelDownloader} from "../data/repository/useLevelDownloader";
import {Level} from "../experience/world/Level";
import {useState} from "react";
import {LevelSelection} from "../component/dialog/LevelSelection";

/**
 * Game page that initializes the game
 */
export function GamePage() {
    const [selectedLevel, setSelectedLevel] = useState<string|undefined>();

    return (
        <>
            <LevelSelection isStarted={!!selectedLevel} onStart={(level) => setSelectedLevel(level)} />

            <Environment isGranted={!!selectedLevel}>
                {selectedLevel && <GameLevel levelName={selectedLevel} />}
            </Environment>
        </>
    );
}

function GameLevel(props: {levelName: string}) {
    const downloadedLevel = useLevelDownloader(props.levelName);

    return downloadedLevel ? <Level {...downloadedLevel} /> : <></>;
}