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

interface PlaylistProp {
    playlist: PlaylistItem;
}