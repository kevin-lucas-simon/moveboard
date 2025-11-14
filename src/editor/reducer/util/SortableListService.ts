import {UUID} from "../../../data/model/UUID";

export type SortableListItem = {
    id: UUID;
    type: string;
    parent: UUID | null;
}

export const SortableListService = {
    /**
     * SortableJS do fire this event on mount for every group instance, so this function prevent this
     * @param originalGroupList
     * @param updatedGroupList
     */
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
    reorderParentItems: <T extends SortableListItem>(
        originalList: T[],
        parentId: UUID | null,
        childIds: UUID[],
    ): {[key: UUID]: T} => {
        if (parentId && !originalList.find(item => item.id === parentId)) {
            throw new Error(`Parent ID ${parentId} not found`);
        }
        childIds.forEach(id => {
            if (!originalList.find(item => item.id === id)) {
                throw new Error('One or more child IDs not found in elements');
            }
        })

        const calculateNestedList = (currentParentId: UUID | null): {[key: UUID]: T} => {
            let nestedItems = originalList
                .filter(item => item.parent === currentParentId)
                .filter(item => !childIds.includes(item.id))

            if (currentParentId === parentId) {
                nestedItems = childIds.map(id => {
                    const item = originalList.find(i => i.id === id);
                    if (!item) {
                        throw new Error(`Item ID ${id} not found in original list`);
                    }
                    return {
                        ...item,
                        parent: parentId,
                    };
                });
            }

            let nestedList: {[key: UUID]: T} = {};
            nestedItems.forEach((item) => {
                nestedList[item.id] = item;

                const hasNestedItems = item.id === parentId || originalList.some(i => i.parent === item.id);
                if (hasNestedItems) {
                    Object.assign(nestedList, calculateNestedList(item.id));
                }
            })

            return nestedList;
        }

        const newItemOrder = calculateNestedList(null);

        if (Object.keys(newItemOrder).length !== originalList.length) {
            throw new Error("New order length does not match the old one")
        }

        return newItemOrder;
    },
}