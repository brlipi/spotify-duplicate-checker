import axios from 'axios'

export async function fetchPlaylists(access_token: string) {
    try {
        const { data } = await axios.get('https://api.spotify.com/v1/me/playlists?limit=50', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return null;
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
    try {
        const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=total%2Climit`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function fetchTracks(access_token: string, playlistId: string, limit: number, offset: number) {
    try {
        const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        return data;
    } catch(error) {
        console.log(error);
        return null;
    }
}