import {UUID} from "../../../data/model/UUID";

export type SortableListItem = {
    id: UUID;
    type: string;
    parent: UUID | null;
}

export const SortableListService = {
    hasItemsBeenMoved: (
        originalGroupList: SortableListItem[],
        updatedGroupList: SortableListItem[],
    ): boolean => {
        // group change is only handled by the corresponding group item (two events on moving between groups)
        if (updatedGroupList.length < originalGroupList.length) {
            return false;
        }

        // check if the order actually changed (event on start)
        let isSameOrder = true;
        for (let index = 0; index < originalGroupList.length; index++) {
            if (updatedGroupList[index].id !== originalGroupList[index].id) {
                isSameOrder = false;
                break;
            }
        }

        // if the order is the same and the length is the same, nothing changed
        if (isSameOrder && updatedGroupList.length === originalGroupList.length) {
            return false;
        }

        // something changed
        return true;
    },
}