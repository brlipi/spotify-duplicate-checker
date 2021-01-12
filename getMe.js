// const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQAn83jd7A2tqDf22CsPPFdV6M47Wz1CmOsedbW4j6s8CsIONHF72COTfIM4Z53rIHExUIruQjLq02swlmQZs9-Yo45haU3EYhqA3EVs-U8YJnE6l7TeVZryIMiMsQmSWgCCWnOelQlpZWHyiVsJj-VbqJq5f5JqwocmlGfmPknW1FoUabsgBPHYg5ucd2u4lSKLKbs58B7mc7Zu2X3XUkMoZvKKztBoIIXPzfm0m8A";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

function main() {
    (async () => {
        const me = await spotifyApi.getMe(); // The user's info is needed to retrieve the playlists.

        const playlists = await spotifyApi.getUserPlaylists(me.body.id, { limit: 50 }); // getUserPlaylists maximum limit is 50.
        console.log('Total playlists: ' + playlists.body.total); // This gets the amount of playlists the user has in total.
        var totalPlaylists = playlists.body.total;
        var rep = 1;
        if ((totalPlaylists - 50) > 50) {
            while ((totalPlaylists - 50) > 50) {
                console.log("Playlist while loop");
                playlists.push(await spotifyApi.getUserPlaylists(me.body.id, { limit: 50, offset: 50 * rep }));
                rep++;
                totalPlaylists = totalPlaylists - 50;
            }
            console.log("Post while");
            console.log(totalPlaylists);
            playlists.push(await spotifyApi.getUserPlaylists(me.body.id, { limit: totalPlaylists - 50, offset: 50 * (rep + 1) }));
        }
        
        const playlistArray = [];
        let count = 0;
        for (let playlist of playlists.body.items) {
            if (playlist.owner.id == me.body.id) { // Sadly won't work if you collaborate on a playlist you haven't created yourself.
                playlistArray[count] = playlist.id;
                count++;
            }
            // console.log(playlist.name + " " + playlist.id + " " + playlist.owner.id + "\n");
        }

        var tracks = await spotifyApi.getPlaylistTracks(playlistArray[3], { limit: 100 }); // getPlaylistTracks max limit is 100.
        console.log('Total tracks: ' + tracks.body.total); // This gets the amount of tracks the playlist has in total.
        var trackArray = [];
        for (let track of tracks.body.items) {
            trackArray.push(track);
        }
        var totalTracks = tracks.body.total;
        rep = 1;
        if ((totalTracks - 100) > 100) {
            while ((totalTracks - 100) > 100) {
                tracks = Object.assign(await spotifyApi.getPlaylistTracks(playlistArray[3], { limit: 100, offset: 100 * rep }));
                for (let track of tracks.body.items) {
                    trackArray.push(track);
                }
                rep++;
                totalTracks = totalTracks - 100;
            }
            tracks = Object.assign(await spotifyApi.getPlaylistTracks(playlistArray[3], { limit: totalTracks - 100, offset: 100 * rep }));
            for (let track of tracks.body.items) {
                trackArray.push(track);
            }
        }

        count = 0;
        console.log("forEach loop: ");
        console.log(trackArray[0].track.artists);

        trackArray.forEach((arrayItem) => {
            arrayItem.track.artists.forEach((artist) => {
                console.log(arrayItem.track.name + " " + artist.name + " " + arrayItem.track.album.name + " " + arrayItem.track.id + "\n");
            })
        });

    })().catch(err => {
        console.error('An error has ocurred: ', err);
    });
}

main(); 
