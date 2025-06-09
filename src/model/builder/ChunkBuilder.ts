import {ChunkModel} from "../ChunkModel";
import {generateUUID} from "three/src/math/MathUtils";
import {FloorBlockModel} from "../../experience/element/block/FloorBlock";
import {ChunkValidator} from "../validator/ChunkValidator";
import {ElementModel} from "../ElementModel";
import {ElementBuilder} from "./ElementBuilder";
import {JointModel} from "../JointModel";

export class ChunkBuilder {
    private chunk: ChunkModel;

    private constructor(name: string) {
        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);

        const floorBlock = ElementBuilder
            .create<FloorBlockModel>("FloorBlock")
            .with("color", randomColor)
            .with("dimension", { x: 3, y: 1, z: 3 })
            .build()
        ;

        this.chunk = {
            id: generateUUID(),
            name: name,
            player: { x: 0, y: 0, z: 0 },
            joints: {},
            elements: {
                [floorBlock.id]: floorBlock
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

    with<K extends keyof ChunkModel>(
        key: K,
        value: ChunkModel[K]
    ): this {
        this.chunk[key] = value;
        return this;
    }

    withElement(element: ElementModel): this {
        this.chunk.elements = {
            ...this.chunk.elements,
            [element.id]: ElementBuilder.from(element).build()
        }
        return this;
    }

    withoutElement(id: string): this {
        this.chunk.elements = Object.fromEntries(
            Object.entries(this.chunk.elements).filter(([key]) => key !== id)
        );
        return this;
    }

    withJoint(joint: JointModel): this {
        this.chunk.joints = {
            ...this.chunk.joints,
            [joint.id]: joint
        };
        return this;
    }

    withoutJoint(id: string): this {
        this.chunk.joints = Object.fromEntries(
            Object.entries(this.chunk.joints).filter(([key]) => key !== id)
        );
        return this;
    }
}
