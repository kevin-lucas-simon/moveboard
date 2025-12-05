import {ReactSortable} from "react-sortablejs";
import {UUID} from "../../data/model/UUID";
import {SortableListItem, SortableListService} from "../reducer/util/SortableListService";
import React from "react";
import clsx from "clsx";

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
    const parentItems = props.items.filter(item => props.isParentOfItem(item, props.parent ?? null));

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
                <li key={item.id} className={clsx(
                    props.isItemSelected?.(item) && "bg-gray-500/10",
                    props.isItemHidden?.(item) && "text-gray-500/50"
                )}>
                    <div
                        onClick={() => props.onSelect?.(item.id)}
                        className="h-9 flex group hover:bg-gray-500/10 pl-4 p-2.5 items-center"
                    >
                        <div className="grow flex gap-2">
                            {props.itemContent(item)}
                        </div>
                    </div>

                    {props.isItemAnExpandedGroup(item) && (
                        <div className="ml-6">
                            <BaseList
                                {...props}
                                parent={item.id as UUID}
                            />
                        </div>
                    )}
                </li>
            ))}
        </ReactSortable>
    );
}
