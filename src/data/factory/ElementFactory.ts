import {ElementDefaultProps} from "../model/element/ElementDefaultProps";
import {ElementDefault, ElementModel, ElementID} from "../model/element/ElementModel";
import {ElementTypes} from "../model/element/ElementTypes";
import {createUUID} from "./UuidFactory";

export function createElement(type: ElementTypes): ElementModel {
    return {
        ...ElementDefaultProps[type]?.defaultProps || ElementDefault,
        id: createUUID(),
        type: type,
    };
}

export function filterElementsByType<T extends ElementModel>(
    elements: {[key: ElementID]: ElementModel},
    type: ElementTypes,
) {
    return Object.fromEntries(
        Object.entries(elements).filter(([_, element]) => element.type === type)
    ) as { [key: ElementID]: T }
}