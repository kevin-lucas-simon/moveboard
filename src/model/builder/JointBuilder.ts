import {JointModel} from "../JointModel";
import {createUUID} from "../util/UUID";
import {Builder} from "./Builder";

export class JointBuilder implements Builder<JointModel> {
    private joint: JointModel;

    private constructor() {
        this.joint = {
            id: createUUID(),
            neighbour: null,
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