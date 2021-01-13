// const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQBaLl8j_IjsmibVPxo1BZoVYuEkiWae2AHNS-WwtFwGmgCuGoVOdHqcprnl6Atj7j3sTk6-sOA4VlP-PZ7-dd66XrbEuevL_hSnMiczArWECIwsCVbgY2-qmn9Thnsw4zWT0gZJyOJpQDhhd_HMW2-EgPybv6Qw9x9Yt4GGEdRaN1RCClq3rdhXAJuO1w2XwElOrfPUZKWOmeQQ8jIMp-jaWvY1SSVWEI5lmHi-twA";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

function main() {
    (async () => {
        const me = await spotifyApi.getMe(); // The user's info is needed to retrieve the playlists.

        var playlists = await spotifyApi.getUserPlaylists(me.body.id, { limit: 50 }); // getUserPlaylists maximum limit is 50.
        console.log('Total playlists: ' + playlists.body.total); // This gets the amount of playlists the user has in total.
        var playlistArray = [];
        for (let playlist of playlists.body.items) {
            playlistArray.push(playlist);
        }
        var totalPlaylists = playlists.body.total;
        var rep = 1;
        if ((totalPlaylists - 50) > 50) {
            while ((totalPlaylists - 50) > 50) {
                playlists = Object.assign(await spotifyApi.getUserPlaylists(me.body.id, { limit: 50, offset: 50 * rep }));
                for (let playlist of playlists.body.items) {
                    playlistArray.push(playlist);
                }
                rep++;
                totalPlaylists -= totalPlaylists - 50;
            }
            console.log(totalPlaylists);
            playlists = Object.assign(await spotifyApi.getUserPlaylists(me.body.id, { limit: 50, offset: 50 * rep }));
            for (let playlist of playlists.body.items) {
                playlistArray.push(playlist);
            }
        }
        
        var userPlaylists = [];
        var count = 0;
        playlistArray.forEach((arrayPlaylist) => {
            if (arrayPlaylist.owner.id == me.body.id || arrayPlaylist.collaborative == true) {
                userPlaylists[count] = arrayPlaylist.name + " " + arrayPlaylist.id;
                count++;
            }
        });

        userPlaylists.forEach((userPlaylistItem) => {
            console.log(userPlaylistItem);
        });

        var tracks = await spotifyApi.getPlaylistTracks(userPlaylists[4], { limit: 100 }); // getPlaylistTracks max limit is 100.
        console.log('Total tracks: ' + tracks.body.total); // This gets the amount of tracks the playlist has in total.
        var trackArray = [];
        for (let track of tracks.body.items) {
            trackArray.push(track);
        }
        var totalTracks = tracks.body.total;
        rep = 1;
        if ((totalTracks - 100) > 100) {
            while ((totalTracks - 100) > 100) {
                tracks = Object.assign(await spotifyApi.getPlaylistTracks(userPlaylists[4], { limit: 100, offset: 100 * rep }));
                for (let track of tracks.body.items) {
                    trackArray.push(track);
                }
                rep++;
                totalTracks = totalTracks - 100;
            }
            tracks = Object.assign(await spotifyApi.getPlaylistTracks(userPlaylists[4], { limit: totalTracks - 100, offset: 100 * rep }));
            for (let track of tracks.body.items) {
                trackArray.push(track);
            }
        }

        trackArray.forEach((arrayItem) => {
            arrayItem.track.artists.forEach((artist) => {
                console.log(arrayItem.track.name + " " + artist.name + " " + arrayItem.track.album.name + " " + arrayItem.track.id + "\n");
            })
        });

    })().catch(err => {
        console.error('An error has ocurred: \nError:', err);
    });
}

main(); 
