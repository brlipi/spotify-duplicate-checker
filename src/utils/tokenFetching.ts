import axios from "axios";
import { client_id, redirect_uri } from "./spotifyAppInfo";

const tokenURL = "https://accounts.spotify.com/api/token";

export async function getAccessToken(code: string, verifier: string): Promise<AccessToken | null> {
    try {
        const { data } = await axios.post(tokenURL, {
            client_id: client_id,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirect_uri,
            code_verifier: verifier
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function isTokenValid(access_token: string): Promise<boolean> {
    try {
        await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getNewAccessToken(refresh_token: string): Promise<AccessToken | null> {
    try {
        const { data } = await axios.post(tokenURL, {
            client_id: client_id,
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}