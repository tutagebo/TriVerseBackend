
export interface RegisterRequest {
    login_id: string;
    name: string;
    password: string;
}

export interface PostMusicRequest {
    player_id: string;
    title: string;
    artist: string;
    year: number;
}
