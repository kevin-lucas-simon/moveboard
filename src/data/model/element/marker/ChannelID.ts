export enum ChannelID {
    ChunkPrimary   = 'chunk:primary',
    ChunkSecondary = 'chunk:secondary',
    LevelPrimary   = 'level:primary',
}

export function isLevelChannel(id: ChannelID): boolean {
    return id.startsWith('level:');
}

export const CHANNEL_LABELS: Record<ChannelID, string> = {
    [ChannelID.ChunkPrimary]:   "Chunk: Primary",
    [ChannelID.ChunkSecondary]: "Chunk: Secondary",
    [ChannelID.LevelPrimary]:   "Level: Primary",
};
