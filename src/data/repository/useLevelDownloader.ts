import {useEffect, useState} from "react";
import {LevelModel} from "../model/world/LevelModel";
import {LevelBuilder} from "../builder/LevelBuilder";

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
                    setLevel(LevelBuilder.from(response).build());
                }
            })
            .catch((e) => {
                console.error("Failed to download level", e);
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
