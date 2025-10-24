import {LevelModel} from "./model/world/LevelModel";
import {LevelOverviewModel} from "./model/world/LevelOverviewModel";

export const serverLevelDB = {
    async listLevels(): Promise<LevelOverviewModel[]> {
        return fetch(window.location.origin + '/levels.json')
            .then(response => response.json())
            .then(response => {
                return response as LevelOverviewModel[];
            })
            .catch(e => {
                console.error("Failed to download list ", e);
                return [];
            })
        ;
    },
    async getLevel(levelID: string): Promise<LevelModel|undefined> {
        return fetch(window.location.origin + '/level/' + levelID + '.json')
            .then(response => response.json())
            .then(response => {
                return response as LevelModel;
            })
            .catch((e) => {
                console.error("Failed to download level " + levelID, e);
                return undefined;
            });
    }
}