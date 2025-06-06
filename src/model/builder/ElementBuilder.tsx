import { ElementModel } from "../ElementModel";
import {generateUUID} from "three/src/math/MathUtils";
import {elementDefinition, elementFallback} from "../../experience/config/elementDefinition";

type PartialDeep<T> = {
    [P in keyof T]?: T[P] extends object ? PartialDeep<T[P]> : T[P];
};

export class ElementBuilder<T extends ElementModel = ElementModel> {
    private element: T;

    private constructor(typeOrElement: string | T) {
        const typeName = typeof typeOrElement === 'string' ? typeOrElement : typeOrElement.type;
        const typeDefinition = elementDefinition[typeName] || elementFallback;

        this.element = {
            ...structuredClone(typeDefinition.defaultProps) as T,
            id: generateUUID(),
        };

        if (typeof typeOrElement !== 'string') {
            this.element = {
                ...this.element,
                ...structuredClone(typeOrElement),
                id: typeOrElement.id || generateUUID(),
            };
        }
    }

    static create<T extends ElementModel = ElementModel>(type: string): ElementBuilder<T> {
        return new ElementBuilder<T>(type);
    }

    static from<T extends ElementModel = ElementModel>(element: T): ElementBuilder<T> {
        return new ElementBuilder<T>(element);
    }

    set<K extends keyof T>(key: K, value: T[K]): this {
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
