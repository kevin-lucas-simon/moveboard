import {useEffect, useState} from "react";
import {LevelModel} from "../model/LevelModel";
import {FloorBlockModel} from "../experience/element/block/FloorBlock";

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
                    setLevel({
                        ...newLevel,
                        name: levelName,
                    } as LevelModel);
                }
            })
        ;
        return () => {
            ignore = true;
        }
    }, [levelName]);

    return level;
}

const newLevel = {
    name: "NewLevel",
    start: "StartChunk",
    chunks: {
        "StartChunk": {
            name: "StartChunk",
            player: {
                x: 0,
                y: 1,
                z: 0
            },
            joints: [],
            elements: [
                {
                    type: "FloorBlock",
                    position: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    dimension: {
                        x: 3,
                        y: 1,
                        z: 3
                    },
                    color: "blue",
                } as FloorBlockModel
            ],
        },
    },
} as LevelModel;
