import axios from 'axios'

export async function fetchPlaylists(token: string) {
    try {
        const { data } = await axios.get('https://api.spotify.com/v1/me/playlists?limit=50', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function fetchFromPlaylist(access_token: string, playlistId: string) {
    const { total, limit } = await getPlaylistSize(access_token, playlistId);
    const offsetsNeeded = Math.ceil(total / limit);
    const tracks = [];

    for (let i = 0; i < offsetsNeeded * limit; i += limit) {
        const { items } = await fetchTracks(access_token, playlistId, limit, i);
        tracks.push(...items);
    }

    return tracks;
}

async function getPlaylistSize(access_token: string, playlistId: string) {
    const result = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=total%2Climit`,
        {
            method: "GET", headers: { Authorization: `Bearer ${access_token}` }
        });

    const { total, limit } = await result.json();

    return { total, limit };
}

async function fetchTracks(code: string, playlistId: string, limit: number, offset: number) {
    const result = await fetch(
        // Can something like URLSearchParams be used so I don't have a MASSIVE url on the editor?
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}&fields=items%28added_at%2Cadded_by%2Cis_local%2Ctrack%28id%2Cname%2Calbum.name%2Cartists%29%29`,
        {
            method: "GET", headers: { Authorization: `Bearer ${code}` }
        });

    return await result.json();
}