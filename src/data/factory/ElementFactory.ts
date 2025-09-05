import {ElementDefaultProps} from "../model/element/ElementDefaultProps";
import {createUUID} from "../model/system/UUID";
import {ElementDefault, ElementModel} from "../model/element/ElementModel";
import {ElementTypes} from "../model/element/ElementTypes";

export function createElement(type: ElementTypes): ElementModel {
    return {
        ...ElementDefaultProps[type]?.defaultProps || ElementDefault,
        id: createUUID(),
        type: type,
    };
}