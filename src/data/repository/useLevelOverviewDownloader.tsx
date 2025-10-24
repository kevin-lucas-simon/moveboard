import {useEffect, useState} from "react";
import {LevelOverviewModel} from "../model/world/LevelOverviewModel";
import {serverLevelDB} from "../serverLevelDB";

export function useLevelOverviewDownloader(): LevelOverviewModel[]|undefined {
    const [levelSelection, setLevelSelection]
        = useState<LevelOverviewModel[]|undefined>(undefined)

    useEffect(() => {
        let ignore = false;
        setLevelSelection(undefined);

        serverLevelDB.listLevels()
            .then(response => {
                if (!ignore) {
                    setLevelSelection(response)
                }
            })

        return () => {
            ignore = true;
        }
    }, []);

    return levelSelection;
}
