interface AccessToken {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

interface PlaylistItem {
    id: string;
    images: [{
        url: string;
    }];
    name: string;
    owner: {
        display_name: string;
    };
    public: boolean;
    tracks: {
        total: number;
    };
    collaborative: boolean;
}

interface PlaylistArray {
    playlists: PlaylistItem[];
}