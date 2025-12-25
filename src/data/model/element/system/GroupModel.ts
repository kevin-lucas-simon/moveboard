import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementTypes} from "../ElementTypes";

export type GroupModel = ElementModel & {
    collapsed: boolean;
};

export const GroupDefault: GroupModel = {
    ...ElementDefault,

    type: ElementTypes.Group,

    collapsed: false,
}