import {ElementDefault, ElementModel} from "../ElementModel";
import {ElementRotatable, ElementRotatableDefault} from "../marker/ElementRotatable";
import {ElementDimensionable, ElementDimensionableDefault} from "../marker/ElementDimensionable";
import {ElementTypes} from "../ElementTypes";
import {ElementChannelSubscriber, ElementChannelSubscriberDefault} from "../marker/ElementChannelSubscriber";

export type DoorBlockModel = ElementModel
    & ElementDimensionable
    & ElementRotatable
    & ElementChannelSubscriber

export const DoorBlockDefault: DoorBlockModel = {
    ...ElementDefault,
    ...ElementDimensionableDefault,
    ...ElementRotatableDefault,
    ...ElementChannelSubscriberDefault,
    type: ElementTypes.DoorBlock,
}