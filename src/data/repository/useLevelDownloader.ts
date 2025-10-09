import {useEffect, useState} from "react";
import {createLevel, LevelID, LevelModel} from "../model/world/LevelModel";

export function useLevelDownloader(
    levelID: LevelID|string|undefined,
): LevelModel|undefined {
    const [level, setLevel]
        = useState<LevelModel|undefined>(undefined)

    useEffect(() => {
        let ignore = false;
        setLevel(undefined);

        fetch(window.location.origin + '/level/' + levelID + '.json')
            .then(response => {
                return response.json();
            })
            .then(response => {
                if (!ignore) {
                    setLevel(response as LevelModel);
                }
            })
            .catch((e) => {
                console.error("Failed to download level", e);
                if (!ignore) {
                    setLevel(createLevel());
                }
            })
        ;
        return () => {
            ignore = true;
        }
    }, [levelID]);

    return level;
}
