import {ElementConfig} from "../model/element/ElementConfig";
import {createUUID} from "../model/shared/UUID";
import {ElementDefault, ElementModel} from "../model/element/ElementModel";
import {ElementTypes} from "../model/element/ElementTypes";

export function createElement(type: ElementTypes): ElementModel {
    return {
        ...ElementConfig[type]?.defaultProps || ElementDefault,
        id: createUUID(),
        type: type,
    };
}