import {ReactSortable} from "react-sortablejs";
import {UUID} from "../../data/model/UUID";
import {SortableListItem, SortableListService} from "../reducer/util/SortableListService";
import React, {useCallback} from "react";
import {BaseListItem} from "./BaseListItem";

export type BaseListProps<T extends SortableListItem> = {
    items: T[];
    itemContent: (item: T) => React.ReactNode;
    isParentOfItem: (child: T, parentId: UUID|null) => boolean;
    isItemAnExpandedGroup: (item: T) => boolean;
    isItemSelected?: (item: T) => boolean;
    isItemHidden?: (item: T) => boolean;
    parent?: UUID|null;
    onSelect?: (id: UUID) => void;
    onReorder: (itemIds: UUID[], parentId: UUID|null) => void;
}

export function BaseList<T extends SortableListItem>(props: BaseListProps<T>) {

    const cachedItemComponent = useCallback(props.itemContent, [props.itemContent]);
    const parentItems = props.items
        .filter(item => props.isParentOfItem(item, props.parent ?? null));

    const reorderParentItems = (newItems: T[]) => {
        if (!SortableListService.hasItemsBeenMoved(parentItems, newItems)) {
            return;
        }
        props.onReorder(
            newItems.map(item => item.id),
            props.parent ?? null,
        );
    }

    return (
        <ReactSortable
            list={structuredClone(parentItems)}
            setList={reorderParentItems}
            tag="ul"
            group={BaseList.name}
        >
            {parentItems.map(item => (
                <BaseListItem
                    key={item.id}
                    isHidden={props.isItemHidden?.(item)}
                    isSelected={props.isItemSelected?.(item)}
                    onClick={() => props.onSelect?.(item.id)}
                    children={cachedItemComponent(item)}
                    recursiveChildren={<>
                        {props.isItemAnExpandedGroup(item) && (
                            <div className="ml-6">
                                <BaseList
                                    {...props}
                                    parent={item.id as UUID}
                                />
                            </div>
                        )}
                    </>}
                />
            ))}
        </ReactSortable>
    );
}
