# Spotify Duplicate Checker
Simple application that checks for song duplicates in a Spotify playlist.

Made using [electron-vite](https://electron-vite.org/) with [React](https://react.dev/) for the front-end. With [axios](https://axios-http.com/docs/intro) for the HTTP requests.

# Installation
Run `npm install` or `yarn` to install all the required dependencies.

# Usage
1. On your browser, go to https://developer.spotify.com/dashboard (login at https://accounts.spotify.com/login if not logged in).
2. Click on 'Create App'.
3. Give your App a name, description and most importantly a redirect uri of `http://localhost:5173/callback` and agree with Spotify's terms and conditions.
4. After creating the App, click on 'Settings'.
5. Copy the Client ID.
6. Back on the application folder, on `VITE_CLIENT_ID`, paste the copied client id after the `=`. Make sure the client id is correct.
7. On `VITE_REDIRECT_URI`, paste the redirect uri you added on the App you created on Spotify's developer dashboard. Make sure the redirect uri is correct.
8. Run the application with `npm run dev` or `yarn dev`.