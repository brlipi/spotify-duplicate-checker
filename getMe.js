'use strict'

async function returnPlaylist(spotifyApi) {
    try {
        const me = await spotifyApi.getMe(); // The user's info is needed to retrieve the playlists.

        var playlists = await spotifyApi.getUserPlaylists(me.body.id, { limit: 50 }); // getUserPlaylists maximum limit is 50.
        console.log('Total playlists: ' + playlists.body.total); // This gets the amount of playlists the user has in total.
        var playlistArray = [];
        for (let playlist of playlists.body.items) {
            playlistArray.push(playlist);
        }
        var totalPlaylists = playlists.body.total;
        var requestOffset = 1;
        if ((totalPlaylists - 50) > 50) {
            while ((totalPlaylists - 50) > 50) {
                playlists = Object.assign(await spotifyApi.getUserPlaylists(me.body.id, { limit: 50, offset: 50 * requestOffset }));
                for (let playlist of playlists.body.items) {
                    playlistArray.push(playlist);
                }
                requestOffset++;
                totalPlaylists -= totalPlaylists - 50;
            }
            console.log(totalPlaylists);
            playlists = Object.assign(await spotifyApi.getUserPlaylists(me.body.id, { limit: 50, offset: 50 * requestOffset }));
            for (let playlist of playlists.body.items) {
                playlistArray.push(playlist);
            }
        }
        
        var userPlaylists = [];
        var count = 0;
        playlistArray.forEach((arrayPlaylist) => {
            userPlaylists[count] = { name: arrayPlaylist.name, id: arrayPlaylist.id, collaborative: arrayPlaylist.collaborative };
            count++;
        });
        return userPlaylists;
    }
    catch(err) {
        console.error(err);
    }
}

async function returnTracks(spotifyApi, trackId) {
    try {
        var tracks = await spotifyApi.getPlaylistTracks(trackId, { limit: 100 }); // getPlaylistTracks max limit is 100.
        console.log('Total tracks: ' + tracks.body.total); // This gets the amount of tracks the playlist has in total.
        var trackArray = [];
        for (let track of tracks.body.items) {
            trackArray.push(track);
        }
        var totalTracks = tracks.body.total;
        var requestOffset = 1;
        if ((totalTracks - 100) > 100) {
            while ((totalTracks - 100) > 100) {
                tracks = Object.assign(await spotifyApi.getPlaylistTracks(trackId, { limit: 100, offset: 100 * requestOffset }));
                for (let track of tracks.body.items) {
                    trackArray.push(track);
                }
                requestOffset++;
                totalTracks = totalTracks - 100;
            }
            tracks = Object.assign(await spotifyApi.getPlaylistTracks(trackId, { limit: totalTracks - 100, offset: 100 * requestOffset }));
            for (let track of tracks.body.items) {
                trackArray.push(track);
            }
        }

        trackArray.forEach((arrayItem) => {
            arrayItem.track.artists.forEach((artist) => {
                console.log(arrayItem.track.name + " " + artist.name + " " + arrayItem.track.album.name + " " + arrayItem.track.id + "\n");
            })
        });
        return trackArray;
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = { returnPlaylist, returnTracks };
