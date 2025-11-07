import {UUID} from "../../../data/model/UUID";

export type SortableListItem = {
    id: UUID;
    type: string;
    parent: UUID|null;
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
    calculateMovedGroupOrder: (
        originalCompleteList: SortableListItem[],
        originalGroupList: SortableListItem[],
        updatedGroupList: SortableListItem[],
        groupParentId: UUID|null,
        groupTypeCode: string,
    ): UUID[] => {
        // check if we have any need to update
        if (!SortableListService.hasItemsBeenMoved(originalGroupList, updatedGroupList)) {
            throw new Error('No items have been moved, do you checked this before calling this method?');
        }

        // update the parent of the moved structures
        const movedItems = updatedGroupList
            .filter(item => !originalGroupList
            .some(e => e.id === item.id)
        );
        movedItems.forEach(item => {
            item.parent = groupParentId;
        });

        // recursively calculate the new total order of elements (we have to remove the old one)
        const calculateGroupOrder = (parent: UUID|null): UUID[] => {
            const sectionItems = groupParentId === parent
                ? updatedGroupList
                : originalCompleteList
                    .filter(item => item.parent === parent)
                    .filter(item => !movedItems.map(item => item.id).includes(item.id))
            ;

            const newGroupOrder: UUID[] = [];
            sectionItems.forEach(item => {
                newGroupOrder.push(item.id);

                if (item.type === groupTypeCode) {
                    const childOrder = calculateGroupOrder(item.id);
                    newGroupOrder.push(...childOrder);
                }
            });

            return newGroupOrder;
        }

        // TODO das ist ganz nett, aber ich brauche die eigentliche updated Liste samt parents und so ^^
        //  - Also statt UUID[] lieber SortableListItem[] zurückgeben, damit level_patch_structure ersetzt werden kann
        //  - Checke das beim EditorChunkElementList ab, vergleiche EditorStructureListItem als Referenz, bevor wir es ersetzen
        return calculateGroupOrder(null);
    },
}