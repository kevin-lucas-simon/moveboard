import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementType} from "../../ElementType";

/**
 * GroupModel represents a group of elements within a chunk.
 * It is used to organize elements hierarchically and manage their visibility.
 */
export type GroupModel = ElementModel & {
    collapsed: boolean;
};

export const GroupDefault: GroupModel = {
    ...ElementDefault,
    type: ElementType.Group,
    collapsed: false,
}