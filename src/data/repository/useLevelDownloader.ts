import {useEffect, useState} from "react";
import {LevelID, LevelModel} from "../model/world/LevelModel";
import {serverLevelDB} from "../serverLevelDB";

export function useLevelDownloader(
    levelID: LevelID|string|undefined,
): LevelModel|undefined {
    const [level, setLevel]
        = useState<LevelModel|undefined>(undefined)

    useEffect(() => {
        let ignore = false;
        setLevel(undefined);

        serverLevelDB.getLevel(levelID as string)
            .then((downloadedLevel) => {
                if (!ignore) {
                    setLevel(downloadedLevel);
                }
            })
        ;
        return () => {
            ignore = true;
        }
    }, [levelID]);

    return level;
}
