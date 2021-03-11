"use strict";

require("dotenv").config();

const SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");

const getMe = require("./getMe");
const check = require("./duplicate-checker");

const scopes = [
  // 'ugc-image-upload',
  // 'user-read-playback-state',
  // 'user-modify-playback-state',
  // 'user-read-currently-playing',
  // 'streaming',
  // 'app-remote-control',
  // 'user-read-email',
  // 'user-read-private',
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  // 'user-top-read',
  // 'user-read-playback-position',
  // 'user-read-recently-played',
  // 'user-follow-read',
  // 'user-follow-modify'
];

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: "http://localhost:8888/callback",
});

const app = express();

app.set("view engine", "pug");

app.get("/login", (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get("/callback", (req, res) => {
  const error = req.query.error;
  const code = req.query.code;

  if (error) {
    console.error("Callback error:", error);
    res.send(`Callback error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const access_token = data.body["access_token"];
      const refresh_token = data.body["refresh_token"];
      const expires_in = data.body["expires_in"];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log("access_token:", access_token);
      console.log("refresh_token:", refresh_token);

      console.log(
        `Successfully retrieved access token. Expires in ${expires_in} seconds.`
      );

      res.redirect("/playlists");

      spotifyApi.setAccessToken(access_token);

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body["access_token"];

        console.log("The access token has been refreshed!");
        console.log("access_token:", access_token);
        spotifyApi.setAccessToken(access_token);
      }, (expires_in / 2) * 1000);
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send(`Error getting tokens: ${error}`);
    });
});

app.get("/playlists", (req, res) => {
  getMe
    .returnPlaylist(spotifyApi)
    .then((data) => {
      res.render("index", {
        playlists: data,
      });
    })
    .catch((err) => console.error(err));
});

app.get("/playlists/:id", (req, res) => {
  const id = req.params.id;
  getMe.returnTracks(spotifyApi, id).then((data) => {
    res.render("tracks", {
      tracks: check.checkForDuplicates(data),
    });
  });
});

app.listen(8888, () => {
  console.log(
    "HTTP Server up. To access it go to: http://localhost:8888/login in your browser."
  );
});
