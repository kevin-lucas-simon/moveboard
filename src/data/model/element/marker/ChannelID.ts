export const ChannelIDs = {
    Chunk: "chunk",
    Level: "level",
} as const;

export type ChannelID = typeof ChannelIDs[keyof typeof ChannelIDs];

export function isLevelChannel(channel: ChannelID): boolean {
    return channel === ChannelIDs.Level;
}

export const CHANNEL_LABELS: Record<ChannelID, string> = {
    [ChannelIDs.Chunk]: "Chunk",
    [ChannelIDs.Level]: "Level",
};
