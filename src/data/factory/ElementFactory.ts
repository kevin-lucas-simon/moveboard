import {ElementDefaultProps} from "../model/element/ElementDefaultProps";
import {ElementDefault, ElementModel} from "../model/element/ElementModel";
import {ElementTypes} from "../model/element/ElementTypes";
import {createUUID} from "./UuidFactory";

export function createElement(type: ElementTypes): ElementModel {
    return {
        ...ElementDefaultProps[type]?.defaultProps || ElementDefault,
        id: createUUID(),
        type: type,
    };
}