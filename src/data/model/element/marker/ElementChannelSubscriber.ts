import {ElementModel} from "../ElementModel";
import {ChannelID} from "./ChannelID";

export type ElementChannelSubscriber = ElementModel & {
    inputChannel: ChannelID | null,
}

export const ElementChannelSubscriberDefault = {
    inputChannel: null as ChannelID | null,
} as const;
