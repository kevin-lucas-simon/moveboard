import {elementConfig} from "../../config/elementConfig";
import {createUUID} from "../model/shared/UUID";
import {ElementDefault, ElementModel} from "../model/element/ElementModel";
import {ElementType} from "../model/ElementType";

export function createElement(type: ElementType): ElementModel {
    return {
        ...elementConfig[type]?.defaultProps || ElementDefault,
        id: createUUID(),
        type: type,
    };
}