import {ElementDefault, ElementModel} from "./ElementModel";
import {BarrierBlockDefault} from "./block/BarrierBlockModel";
import {BasicBlockDefault} from "./block/BasicBlockModel";
import {BounceBlockDefault} from "./block/BounceBlockModel";
import {FloorBlockDefault} from "./block/FloorBlockModel";
import {ElementGroupDefault} from "./system/ElementGroupModel";
import {JointDefault} from "./joint/JointModel";
import {ElementTypes} from "./ElementTypes";

export const ElementDefaultProps: Record<ElementTypes, {
    defaultProps: ElementModel;
}> = {
    [ElementTypes.BarrierBlock]: {
        defaultProps: BarrierBlockDefault,
    },
    [ElementTypes.BasicBlock]: {
        defaultProps: BasicBlockDefault,
    },
    [ElementTypes.BounceBlock]: {
        defaultProps: BounceBlockDefault
    },
    [ElementTypes.FloorBlock]: {
        defaultProps: FloorBlockDefault,
    },
    [ElementTypes.Group]: {
        defaultProps: ElementGroupDefault,
    },
    [ElementTypes.Joint]: {
        defaultProps: JointDefault,
    },
    [ElementTypes.Unknown]: {
        defaultProps: ElementDefault,
    },
}