import {useEffect, useState} from "react";
import {LevelModel} from "../model/LevelModel";
import {LevelBuilder} from "../model/builder/LevelBuilder";

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
                    setLevel(response as LevelModel)
                }
            })
            .catch(() => {
                if (!ignore) {
                    setLevel(LevelBuilder.create(levelName).build());
                }
            })
        ;
        return () => {
            ignore = true;
        }
    }, [levelName]);

    return level;
}
