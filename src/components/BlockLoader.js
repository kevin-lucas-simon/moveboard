import {BasicBlock} from "./blocks/BasicBlock";
import {DebugJointBlock} from "./blocks/DebugJointBlock";

export function BlockLoader(props) {
    switch (props.type) {
        case "block:basic":
            return <BasicBlock {...props} />
        case "joint:block":
            return <DebugJointBlock {...props} />
        default:
            return console.error("Block type not found!", props.type)
    }
}
