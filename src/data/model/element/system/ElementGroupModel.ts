import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";

/**
 * ElementGroupModel represents a group of elements within a chunk.
 * It is used to organize elements hierarchically and manage their visibility.
 */
export type ElementGroupModel = ElementModel & {
    collapsed: boolean;
};

export const ElementGroupDefault: ElementGroupModel = {
    ...ElementDefault,
    type: ElementTypes.Group,
    collapsed: false,
}