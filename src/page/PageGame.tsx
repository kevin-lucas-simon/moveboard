import {useLevelDownloader} from "../data/repository/useLevelDownloader";
import {useState} from "react";
import {LevelSelection} from "../component/dialog/LevelSelection";
import {Experience} from "../experience/Experience";

/**
 * Game page that initializes the game
 */
export function PageGame() {
    const [selectedLevel, setSelectedLevel] = useState<string|undefined>();

    return (
        <>
            <LevelSelection isStarted={!!selectedLevel} onStart={(level) => setSelectedLevel(level)} />

            {selectedLevel &&
                <GameLevel isGranted={!!selectedLevel} levelName={selectedLevel} />
            }
        </>
    );
}

function GameLevel(props: {
    isGranted: boolean,
    levelName: string
}) {
    const downloadedLevel = useLevelDownloader(props.levelName);

    return (
        <Experience isGranted={props.isGranted} level={downloadedLevel} />
    );
}