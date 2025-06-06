import {ChunkModel} from "../ChunkModel";
import {generateUUID} from "three/src/math/MathUtils";
import {FloorBlockModel} from "../../experience/element/block/FloorBlock";
import {Vector3Like} from "three";
import {ChunkValidator} from "../validator/ChunkValidator";
import {ElementModel} from "../ElementModel";
import {ElementBuilder} from "./ElementBuilder";

export class ChunkBuilder {
    private chunk: ChunkModel;

    private constructor(name: string) {
        const elementId = generateUUID();
        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);

        this.chunk = {
            id: generateUUID(),
            name: name,
            player: { x: 0, y: 0, z: 0 },
            joints: [],
            elements: {
                [elementId]: {
                    id: elementId,
                    type: "FloorBlock",
                    position: {
                        x: 0,
                        y: -1,
                        z: 0
                    },
                    dimension: {
                        x: 3,
                        y: 1,
                        z: 3
                    },
                    color: randomColor,
                } as FloorBlockModel
            }
        };
    }

    static create(name: string): ChunkBuilder {
        return new ChunkBuilder(name);
    }

    static from(raw: ChunkModel): ChunkBuilder {
        const builder = new ChunkBuilder(raw.name);
        builder.chunk = structuredClone(raw);
        return builder;
    }

    build(): ChunkModel {
        ChunkValidator.validate(this.chunk);
        return this.chunk;
    }

    setName(name: string): ChunkBuilder {
        this.chunk.name = name;
        return this;
    }

    setPlayerPosition(position: Vector3Like): ChunkBuilder {
        this.chunk.player = structuredClone(position);
        return this;
    }

    addElement(element: ElementModel) {
        this.chunk.elements = {
            ...this.chunk.elements,
            [element.id]: ElementBuilder.from(element).build()
        }
        return this;
    }

    removeElement(id: string): ChunkBuilder {
        this.chunk.elements = Object.fromEntries(
            Object.entries(this.chunk.elements).filter(([key]) => key !== id)
        );
        return this;
    }

    // addJoint(joint: JointModel): ChunkBuilder {
    //     this.chunk.joints = [...this.chunk.joints, structuredClone(joint)];
    //     return this;
    // }

    // removeJoint
}