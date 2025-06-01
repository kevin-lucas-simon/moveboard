import {useEffect, useState} from "react";
import {LevelOverviewModel} from "../model/LevelOverviewModel";

export function useLevelOverviewDownloader(): LevelOverviewModel[]|undefined {
    const [levelSelection, setLevelSelection]
        = useState<LevelOverviewModel[]|undefined>(undefined)

    useEffect(() => {
        let ignore = false;
        setLevelSelection(undefined);
        fetch(window.location.origin + '/levels.json')
            .then(response => response.json())
            .then(response => {
                if (!ignore) {
                    setLevelSelection(response as LevelOverviewModel[])
                }
            })
        ;
        return () => {
            ignore = true;
        }
    }, []);

    return levelSelection;
}
