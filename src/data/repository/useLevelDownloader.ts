import {useEffect, useState} from "react";
import {createLevel, LevelModel} from "../model/world/LevelModel";

export function useLevelDownloader(
    levelName: string
): LevelModel|undefined {
    const [level, setLevel]
        = useState<LevelModel|undefined>(undefined)

    useEffect(() => {
        let ignore = false;
        setLevel(undefined);
        fetch(window.location.origin + '/level/' + levelName + '.json')
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
    }, [levelName]);

    return level;
}
