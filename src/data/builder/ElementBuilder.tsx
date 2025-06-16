import {ElementModel} from "../model/element/ElementModel";
import {elementConfig, elementFallbackConfig} from "../../config/elementConfig";
import {createUUID} from "../model/shared/UUID";
import {Builder} from "./Builder";
import {ElementType} from "../model/element/ElementType";

type PartialDeep<T> = {
    [P in keyof T]?: T[P] extends object ? PartialDeep<T[P]> : T[P];
};

export class ElementBuilder<T extends ElementModel = ElementModel> implements Builder<T> {
    private element: T;

    private constructor(typeOrElement: string | T) {
        if (typeof typeOrElement === "string") {
            const definition = elementConfig[typeOrElement as ElementType] || elementFallbackConfig;
            this.element = {
                ...structuredClone(definition.defaultProps) as T,
                id: createUUID(),
            };
        } else {
            this.element = structuredClone(typeOrElement);
        }
    }

    static create<T extends ElementModel = ElementModel>(type: string): ElementBuilder<T> {
        return new ElementBuilder<T>(type);
    }

    static from<T extends ElementModel = ElementModel>(element: T): ElementBuilder<T> {
        return new ElementBuilder<T>(element);
    }

    with<K extends keyof T>(key: K, value: T[K]): this {
        this.element[key] = value;
        return this;
    }

    patch(props: PartialDeep<T>): this {
        this.element = {
            ...this.element,
            ...props,
        };
        return this;
    }

    build(): T {
        return this.element;
    }
}
