import {BasicBlock} from "./blocks/BasicBlock";
import {DebugJointBlock} from "./blocks/DebugJointBlock";
import React from "react";

const blockMapper = new Map([
    ["block:basic", BasicBlock],
    ["joint:block", DebugJointBlock],
])

export function BlockLoader(props) {
    const Component = blockMapper.get(props.type);
    if (!Component) {
        console.error("Block type not found!", props.type)
        return <></>
    }
    return <Component {...props} />;
}
