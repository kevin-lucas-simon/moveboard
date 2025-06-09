import {JointModel} from "../JointModel";
import {generateUUID} from "three/src/math/MathUtils";

export class JointBuilder {
    private joint: JointModel;

    private constructor() {
        this.joint = {
            id: generateUUID(),
            neighbour: "",
            position: { x: 0, y: 0, z: 0 },
            dimension: { x: 1, y: 1, z: 1 },
            vision: 1,
        };
    }

    static create(): JointBuilder {
        return new JointBuilder();
    }

    static from(joint: JointModel): JointBuilder {
        const builder = new JointBuilder();
        builder.joint = structuredClone(joint);
        return builder;
    }

    build(): JointModel {
        // TODO validate joint
        return this.joint;
    }

    with<K extends keyof JointModel>(
        key: K,
        value: JointModel[K]
    ): this {
        this.joint[key] = value;
        return this;
    }
}