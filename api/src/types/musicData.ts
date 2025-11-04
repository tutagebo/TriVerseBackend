export interface MusicData {
    id: string;
    artist: string;
    title: string;
    postPlayerId: string;
    audioData?: Buffer;
    jacketData?: Buffer;
    licenseImageData?: Buffer;
    createdAt?: Date;
}