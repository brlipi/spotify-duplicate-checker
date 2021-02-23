'use strict'

async function returnPlaylist(spotifyApi) {
    try {
        const me = await spotifyApi.getMe(); // The user's info is needed to retrieve the playlists.

        var playlists = await spotifyApi.getUserPlaylists(me.body.id, {
            limit: 50
        }); // getUserPlaylists maximum limit is 50.
        var totalPlaylists = playlists.body.total; // This gets the amount of playlists the user has in total.
        var playlistArray = [];
        for (let playlist of playlists.body.items) {
            playlistArray.push(playlist);
        }

        var requestOffset = 1;
        if ((totalPlaylists - 50) > 50) {
            while ((totalPlaylists - 50) > 50) {
                playlists = Object.assign(await spotifyApi.getUserPlaylists(me.body.id, {
                    limit: 50,
                    offset: 50 * requestOffset
                }));
                for (let playlist of playlists.body.items) {
                    playlistArray.push(playlist);
                }
                requestOffset++;
                totalPlaylists -= totalPlaylists - 50;
            }
            console.log(totalPlaylists);
            playlists = Object.assign(await spotifyApi.getUserPlaylists(me.body.id, {
                limit: 50,
                offset: 50 * requestOffset
            }));
            for (let playlist of playlists.body.items) {
                playlistArray.push(playlist);
            }
        }

        var userPlaylists = [];
        var count = 0;
        playlistArray.forEach((arrayPlaylist) => {
            userPlaylists[count] = {
                name: arrayPlaylist.name,
                id: arrayPlaylist.id,
                collaborative: arrayPlaylist.collaborative
            };
            count++;
        });
        return userPlaylists;
    } catch (err) {
        console.error(err);
    }
}

async function returnTracks(spotifyApi, trackId) {
    try {
        var tracks = await spotifyApi.getPlaylistTracks(trackId, {
            limit: 100
        }); // getPlaylistTracks max limit is 100.
        var totalTracks = tracks.body.total; // This gets the amount of tracks the playlist has in total.
        var trackArray = [];
        for (let track of tracks.body.items) {
            trackArray.push(track);
        }

        var requestOffset = 1;
        if ((totalTracks - 100) > 100) {
            while ((totalTracks - 100) > 100) {
                tracks = Object.assign(await spotifyApi.getPlaylistTracks(trackId, {
                    limit: 100,
                    offset: 100 * requestOffset
                }));
                for (let track of tracks.body.items) {
                    trackArray.push(track);
                }
                requestOffset++;
                totalTracks = totalTracks - 100;
            }
            tracks = Object.assign(await spotifyApi.getPlaylistTracks(trackId, {
                limit: totalTracks - 100,
                offset: 100 * requestOffset
            }));
            for (let track of tracks.body.items) {
                trackArray.push(track);
            }
        }

        var userTracks = [];
        var count = 0;
        trackArray.forEach((arrayItem) => {
            var artists = '';
            arrayItem.track.artists.forEach((artist) => {
                artists += artist.name + ', ';
            })
            artists = artists.slice(0, artists.length - 2);
            userTracks[count] = {
                artists: artists,
                name: arrayItem.track.name,
                album: arrayItem.track.album.name,
                id: arrayItem.track.id
            };
            count++;
        });
        return userTracks;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    returnPlaylist,
    returnTracks
};
