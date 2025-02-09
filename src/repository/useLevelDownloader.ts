import {useEffect, useState} from "react";
import {LevelModel} from "../model/LevelModel";

export function useLevelDownloader(
    levelName: string
): LevelModel|undefined {
    const [level, setLevel]
        = useState<LevelModel|undefined>(undefined)

    useEffect(() => {
        let ignore = false;
        setLevel(undefined);
        fetch(window.location.origin + '/level/' + levelName + '.json')
            .then(response => response.json())
            .then(response => {
                if (!ignore) {
                    setLevel(response as LevelModel)
                }
            })
        ;
        return () => {
            ignore = true;
        }
    }, [levelName]);

    return level;
}
