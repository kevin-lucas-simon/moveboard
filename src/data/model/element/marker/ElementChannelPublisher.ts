import {ElementModel} from "../ElementModel";
import {ChannelID} from "./ChannelID";

export type ElementChannelPublisher = ElementModel & {
    outputChannel: ChannelID | null,
}

export const ElementChannelPublisherDefault = {
    outputChannel: null as ChannelID | null,
} as const;
