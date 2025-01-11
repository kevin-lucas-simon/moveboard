import {useEffect, useState} from "react";
import {LevelModel} from "../model/LevelModel";

export function useLevelDownloader(
    levelName: string
): LevelModel|undefined {
    const [downloadedLevel, setDownloadedLevel]
        = useState<LevelModel|undefined>(undefined)

    useEffect(() => {
        let ignore = false;
        setDownloadedLevel(undefined);
        fetch(window.location.origin + '/level/' + levelName + '.json')
            .then(response => response.json())
            .then(response => {
                if (!ignore) {
                    setDownloadedLevel(response as LevelModel)
                }
            })
        ;
        return () => {
            ignore = true;
        }
    }, [levelName]);

    return downloadedLevel;
}
