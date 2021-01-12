// const fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQDs5VCAH0VTKc74E43WfWZQsTXN26mHraDk56wji91LsUvXdXauaM1o_zhf0HshXqIsF4MWm3l3zBbuhBTM9LXTLaEBJpHqjLpaHTBlrgwYXC712_RhP_aAEjEyx4PEh1_9vJii25kFy0sLMZArZIbZsEHh7vA51Tx8jsjbHO_NSoGLJqoDKBEnc5mrL453rv4MPDFI-7te8Q4wi5p8aMhAL-zDtGjEHy_N5Tja5qE";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

function main() {
    (async () => {
        const me = await spotifyApi.getMe();

        const playlists = await spotifyApi.getUserPlaylists(me.body.id, { limit: 50 }); // getUserPlaylists maximum limit is 50.
        // console.log(playlists);
        console.log('Type of "playlists": ' + typeof(playlists));
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
        console.log('Type of "tracks": ' + typeof(tracks));
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
                // console.log(tracks.body.href);
                // console.log(tracks.body.items);
                rep++;
                totalTracks = totalTracks - 100;
            }
            // console.log(trackArray);
            // console.log(tracks.body.items);
            console.log("rep final value: " + rep);
            tracks = Object.assign(await spotifyApi.getPlaylistTracks(playlistArray[3], { limit: totalTracks - 100, offset: 100 * rep }));
            console.log(tracks.body.items);
            for (let track of tracks.body.items) {
                trackArray.push(track);
            }
            console.log("Tracks Array");
            console.log(trackArray);
            // console.log(tracks.body.items);
        }

        count = 0;
        for (let track of tracks.body.items) {
            console.log(track.track.name + " " + track.track.artists + " " + track.track.album + " " + track.track.id + "\n");
        }

    })().catch(err => {
        console.error(err);
    });
}

main(); 
