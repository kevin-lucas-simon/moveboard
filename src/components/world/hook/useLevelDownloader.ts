import {useEffect, useState} from "react";
import {NewLevelModel} from "../../model/NewLevelModel";

export function useLevelDownloader(
    levelName: string
): NewLevelModel|undefined {
    const [downloadedLevel, setDownloadedLevel]
        = useState<NewLevelModel|undefined>(undefined)

    useEffect(() => {
        fetch(window.location.origin + '/level/' + levelName + '.json')
            .then(response => response.json())
            .then(response => setDownloadedLevel(response as NewLevelModel))
        ;
    }, [levelName]);

    return downloadedLevel;
}
