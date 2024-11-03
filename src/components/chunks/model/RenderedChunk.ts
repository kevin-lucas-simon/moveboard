import * as React from "react";
import {Vector3Like} from "three";

export type RenderedChunk = {
    component: React.ReactElement<any>,
    position: Vector3Like,
    dimension: RenderedChunkDimension,
    updated: number,
    visible: boolean,
}

export type RenderedChunkDimension = {
    dimension: Vector3Like,
    minimalPosition: Vector3Like,
    maximalPosition: Vector3Like,
}