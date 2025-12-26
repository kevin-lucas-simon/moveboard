import {ElementDefault, ElementModel} from "./ElementModel";
import {BarrierBlockDefault} from "./block/BarrierBlockModel";
import {BasicBlockDefault} from "./block/BasicBlockModel";
import {BounceBlockDefault} from "./block/BounceBlockModel";
import {FloorBlockDefault} from "./block/FloorBlockModel";
import {GroupDefault} from "./system/GroupModel";
import {JointDefault} from "./joint/JointModel";
import {ElementTypes} from "./ElementTypes";
import {SpinnerBlockDefault} from "./block/SpinnerBlockModel";

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
        defaultProps: GroupDefault,
    },
    [ElementTypes.Joint]: {
        defaultProps: JointDefault,
    },
    [ElementTypes.SpinnerBlock]: {
        defaultProps: SpinnerBlockDefault,
    },
    [ElementTypes.Unknown]: {
        defaultProps: ElementDefault,
    },
}