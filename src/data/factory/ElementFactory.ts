import {elementConfig} from "../../config/elementConfig";
import {createUUID} from "../model/shared/UUID";
import {ElementDefault, ElementModel} from "../model/element/ElementModel";
import {ElementTypes} from "../model/ElementTypes";

export function createElement(type: ElementTypes): ElementModel {
    return {
        ...elementConfig[type]?.defaultProps || ElementDefault,
        id: createUUID(),
        type: type,
    };
}