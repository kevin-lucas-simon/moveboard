import * as React from "react";
import {Vector3Like} from "three";

export type RenderedChunk = {
    component: React.ReactElement<any>,
    position: Vector3Like,
    updated: number,
    visible: boolean,
}