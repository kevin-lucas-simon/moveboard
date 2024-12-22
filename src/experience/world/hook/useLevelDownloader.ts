import {useEffect, useState} from "react";
import {LevelModel} from "../model/LevelModel";

export function useLevelDownloader(
    levelName: string
): LevelModel|undefined {
    const [downloadedLevel, setDownloadedLevel]
        = useState<LevelModel|undefined>(undefined)

    useEffect(() => {
        fetch(window.location.origin + '/level/' + levelName + '.json')
            .then(response => response.json())
            .then(response => setDownloadedLevel(response as LevelModel))
        ;
    }, [levelName]);

    return downloadedLevel;
}
