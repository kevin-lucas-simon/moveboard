import {Euler} from "three";

export interface AngleLike {
    readonly x: number;
    readonly y: number;
    readonly z: number;
}

/**
 * Rotation in degrees.
 */
export class Angle implements AngleLike {
    constructor(
        public x: number = 0,
        public y: number = 0,
        public z: number = 0
    ) {
    }

    copy(r: AngleLike): this {
        this.x = r?.x ?? 0;
        this.y = r?.y ?? 0;
        this.z = r?.z ?? 0;
        return this;
    }

    toEuler(): Euler {
        return new Euler(
            this.x * Math.PI / 180,
            this.y * Math.PI / 180,
            this.z * Math.PI / 180,
        );
    }
}