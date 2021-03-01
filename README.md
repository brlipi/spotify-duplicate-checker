# Spotify Duplicate Checker
Simple application that checks for song duplicates in a Spotify playlist.

It uses the [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node) wrapper for Node.JS for authorizing the access of users' playlists and the fetching of the users' playlists and their tracks. Which are then ran through a simple algorithm that checks for tracks that may have been accidentally added more than once.

The application can already be used, but I plan on adding more details and refine the existing ones.

# Installation
A simple ```npm install``` is enough to get all the required dependencies.

# Usage
Initiate the application by running ```npm start```, then, on your browser, go to ```localhost:8888/login```. For the first time doing this, you will be redirected to a Spotify page which you have to use your login credentials to authorize the application's access of your playlists.

Once your playlists are shown, you can choose one to click. This will get the tracks of the chosen playlist and return any duplicates found.

To stop the application, hit <kbd>Ctrl</kbd> + <kbd>C</kbd> on the terminal window where the application was initialized.
